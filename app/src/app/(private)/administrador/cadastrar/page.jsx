'use client';
import { useRef, useState, useEffect } from 'react';
import '../styles/cadastrar.css';

export default function RegistroPage() {
  // titulo da guia
  useEffect(() => {
    document.title = 'EduTrip - Cadastrar';
  }, []);

  const cpfInputRef = useRef(null);
  const [tipo, setTipo] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const camposNumericos = ['escola_id', 'ponto_embarque_id', 'viagem_id', 'veiculo_id'];
    const camposSemNumeros = ['nome', 'nome_responsavel'];

    let novoValor = value;

    // Remove dígitos de nomes
    if (camposSemNumeros.includes(name)) {
      novoValor = novoValor.replace(/[0-9]/g, '');
    }
    if (name === 'cpf' || name === 'cpf_responsavel') {
      novoValor = value.replace(/\D/g, '').slice(0, 11); // remove tudo que não é dígito e limita a 11
    }

    setForm((prev) => ({
      ...prev,
      [name]: camposNumericos.includes(name) ? (novoValor ? parseInt(novoValor, 10) : null) : novoValor
    }));
  };


  const formRef = useRef(null);
  const [form, setForm] = useState({});

  // escolha de usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tipo) return alert('Selecione um tipo de usuário.');
    if (tipo === 'aluno' && !form.escola_id) return alert('Selecione uma escola da lista.');


    try {
      let url = '';
      let corpo = {};

      switch (tipo) {
        case 'aluno':
          url = 'http://localhost:3001/cadastro/aluno-com-responsavel';
          corpo = {
            aluno: {
              cpf: form.cpf,
              nome: form.nome,
              email: form.email,
              telefonePrinc: form.telefonePrinc,
              dataNascimento: form.dataNascimento,
              escola_id: form.escola_id,
              ponto_embarque_id: form.ponto_embarque_id,
              viagem_id: form.viagem_id,
              senha: form.senha,
              turno: form.turno
            },
            responsavel: {
              cpf: form.cpf_responsavel,
              nome: form.nome_responsavel,
              email: form.email_responsavel,
              telefone: form.telefone_responsavel,
              senha: form.senha_responsavel
            },
          };
          break;
        case 'motorista':
          url = 'http://localhost:3001/cadastro/motorista';
          corpo = {
            cpf: form.cpf,
            nome: form.nome,
            cnh: form.cnh,
            vencimento_habilitacao: form.vencimento_habilitacao,
            telefone: form.telefone,
            email: form.email,
            senha: form.senha
          };
          break;
        case 'administrador':
          url = 'http://localhost:3001/cadastro/administrador';
          corpo = {
            cpf: form.cpf,
            nome: form.nome,
            email: form.email,
            telefone: form.telefone,
            senha: form.senha
          };
          break;
        default:
          return alert('Tipo de cadastro não suportado.');
      }
      console.log("DADOS DO FORM:", form);
      const resposta = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo),
        credentials: 'include'
      });

      const resultado = await resposta.json();
      if (resposta.ok) {
        alert(resultado.mensagem);
        setForm({});
        setNomeEscola('');
        setPontoNome('');
        formRef.current.reset();
      } else {
        alert(resultado.erro || 'Erro ao registrar.');
      }
    } catch (err) {
      alert('Erro de rede: ' + err.message);
    }
  };

  // Após setar escola_id e ponto_embarque_id, busca o viagem_id
  useEffect(() => {
    async function fetchViagem() {
      if (form.escola_id && form.ponto_embarque_id) {
        try {
          const res = await fetch(
            `http://localhost:3001/viagem-por-escola-ponto?escola_id=${form.escola_id}&ponto_embarque_id=${form.ponto_embarque_id}`,
            { credentials: 'include' }
          );
          const data = await res.json();
          if (res.ok && data.id) {
            setForm(prev => ({ ...prev, viagem_id: data.id }));
          } else {
            setForm(prev => ({ ...prev, viagem_id: null }));
            console.warn('Viagem não encontrada');
          }
        } catch (err) {
          console.error('Erro ao buscar viagem:', err);
          setForm(prev => ({ ...prev, viagem_id: null }));
        }
      }
    }
    fetchViagem();
  }, [form.escola_id, form.ponto_embarque_id]);

  // busca as escola com base no que o usuario escrever
  const [nomeEscola, setNomeEscola] = useState('');
  const [escolas, setEscolas] = useState([]);
  const [pontoNome, setPontoNome] = useState('');

  const buscarEscolas = async (nome) => {
    if (!nome || nome.length < 2) return setEscolas([]);
    try {
      const res = await fetch(`http://localhost:3001/escolas?nome=${encodeURIComponent(nome)}`, {
        credentials: 'include'
      });
      const data = await res.json();
      setEscolas(data);
    } catch (err) {
      console.error('Erro ao buscar escolas:', err);
    }
  };

  const [responsavelExiste, setResponsavelExiste] = useState(null);

// chama qnd campos de cpf/email/telefone do responsavel mudarem
useEffect(() => {
  const verificar = async () => {
    if (form.cpf_responsavel && form.email_responsavel && form.telefone_responsavel) {
      try {
        const res = await fetch('http://localhost:3001/verificar-responsavel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cpf: form.cpf_responsavel,
            email: form.email_responsavel,
            telefone: form.telefone_responsavel,
          }),
        });

        const data = await res.json();
        setResponsavelExiste(data.existe);
      } catch (err) {
        console.error('Erro ao verificar responsável', err);
        setResponsavelExiste(null);
      }
    }
  };
  verificar();
}, [form.cpf_responsavel, form.email_responsavel, form.telefone_responsavel]);

  // ao digitar nomes, ele nao permite caracteres numericos
  const textRef = useRef(null);
  useEffect(() => {
    if (textRef.current) {
      textRef.current.addEventListener("input", (e) => {
        let value = e.target.value.replace(/[0-9]/g, '') // remove caracteres numericos
        e.target.value = value;
      })
    }
  })

  // formatacao de cpf para o front
  const formatCpf = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    return digits
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  };

  //formatacao de telefone p o front
  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    return digits
      .replace(/^(\d{2})(\d)/, '($1)$2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  };

  // formatacao de cnh p o front
  const formatCNH = (value) => {
    return value.replace(/\D/g, '').slice(0, 9);
  };

  // validade min da CNH pode ser hoje, a validade max pode ser a partir de hoje + 5 anos
  function calcularMinData() {
    const hoje = new Date();
    return hoje.toISOString().split('T')[0]; // formata para yyyy-mm-dd
  }

  function calcularMaxData() {
    const hoje = new Date();
    hoje.setFullYear(hoje.getFullYear() + 5); // adiciona 5 anos
    return hoje.toISOString().split('T')[0];
  }

  const renderCamposEspecificos = () => {
    switch (tipo) {
      case 'aluno':
        return (
          <>
            <div className="w-full group">
              <input name="cpf" placeholder="CPF" required value={formatCpf(form.cpf || '')} onChange={(e) =>
                handleChange({
                  target: {
                    name: 'cpf',
                    value: e.target.value.replace(/\D/g, '')
                  }
                })
              } />
            </div>
            <input name="email" pattern="^[a-zA-Z0-9._%+-]+@al\.gov\.br$" placeholder="Email institucional" onChange={handleChange} required autoComplete="off" />
            <input name="nome" value={form.nome || ''} placeholder="Nome completo" onChange={handleChange} required />
            <input name="telefonePrinc" placeholder="Telefone" required value={formatPhone(form.telefonePrinc || '')} onChange={(e) => handleChange({
              target: {
                name: 'telefonePrinc',
                value: e.target.value.replace(/\D/g, '')
              }
            })
            } />
            <input type="date"
              name="dataNascimento"
              placeholder="Data de nascimento"
              required
              value={form.dataNascimento || ''}
              onChange={handleChange}
              className='data' />

            {/* Autocomplete da escola */}
            <div className="data w-full group">
              <input
                type="text"
                name="escola_nome"
                value={nomeEscola}
                onChange={async (e) => {
                  const nome = e.target.value;
                  setNomeEscola(nome);
                  await buscarEscolas(nome);
                  setForm((prev) => ({ ...prev, escola_id: null }));
                }}
                placeholder="Nome da escola"
                autoComplete="off"
                required
              />

              {escolas.length > 0 && (
                <ul className="autoc-escolas absolute w-full mt-2order border-gray-300 overflow-y-auto rounded shadow">
                  {escolas.map((escola) => (
                    <li
                      key={escola.id}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      onClick={async () => {
                        setNomeEscola(escola.nome);
                        setEscolas([]);
                        handleChange({ target: { name: 'escola_id', value: escola.id } });

                        try {
                          const res = await fetch(`http://localhost:3001/ponto-por-escola?escolaId=${escola.id}`, {
                            credentials: 'include',
                          });
                          const ponto = await res.json();
                          if (res.ok) {
                            handleChange({ target: { name: 'ponto_embarque_id', value: ponto.id } });
                            setPontoNome(ponto?.nome || '');
                          }
                        } catch (err) {
                          console.error('Erro ao buscar ponto de embarque:', err);
                        }
                      }}
                    >
                      {escola.nome}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Campo preenchido automaticamente com o nome do ponto */}
            <div className="w-full group">
              <input
                type="text"
                name="ponto_embarque_nome"
                defaultValue={pontoNome}
                disabled
                className="input block py-2.5 px-0 w-full text-sm text-gray-500 bg-gray-100 border-b-2 border-gray-300 appearance-none cursor-not-allowed peer"
                placeholder="Ponto de ônibus"
              />
            </div>
            <select name="turno" value={form.turno || ''} onChange={handleChange} required className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 mb-5">
              <option value="" disabled>Selecionar turno</option>
              <option value="manha">Manhã</option>
              <option value="tarde">Tarde</option>
              <option value="noite">Noite</option>
              <option value="integral">Integral</option>
            </select>
            <input name="senha" className="data" placeholder="Senha" type="password" onChange={handleChange} required autoComplete="off" />
            {/* Campos do Responsável */}
            <h2 className="text-lg font-semibold mt-6 h2-resp">Responsável</h2>
            <input name="cpf_responsavel" placeholder="CPF do responsável" required value={formatCpf(form.cpf_responsavel || '')} onChange={(e) =>
              handleChange({
                target: {
                  name: 'cpf_responsavel',
                  value: e.target.value.replace(/\D/g, '')
                }
              })
            } />
            <input name="nome_responsavel" placeholder="Nome do responsável" onChange={handleChange} required value={form.nome_responsavel || ''} />
            <input name="email_responsavel" placeholder="Email do responsável" onChange={handleChange} required value={form.email_responsavel || ''} />
            <input name="telefone_responsavel" placeholder="Telefone do responsável" value={formatPhone(form.telefone_responsavel || '')} onChange={(e) =>
              handleChange({
                target: {
                  name: 'telefone_responsavel',
                  value: e.target.value.replace(/\D/g, '')
                }
              })
            } />
            {/* mostrar campo senha so se responsavel NÃO existir */}
            {responsavelExiste === false && (
              <input
                name="senha_responsavel"
                placeholder="Senha do responsável"
                type="password"
                onChange={handleChange}
                required
                value={form.senha_responsavel || ''}
              />
            )}
          </>
        );

      case 'motorista':
        return (
          <>
            <input name="cpf" placeholder="CPF" required value={formatCpf(form.cpf || '')} onChange={(e) => handleChange({ target: { name: 'cpf', value: e.target.value.replace(/\D/g, '') } })} />
            <input name="nome" placeholder="Nome completo" onChange={handleChange} required ref={textRef} value={form.nome || ''} />
            <input name="cnh" placeholder="CNH" required value={formatCNH(form.cnh || '')} onChange={(e) => handleChange({ target: { name: 'cnh', value: e.target.value } })} />
            <input name="telefone" placeholder="Telefone" required value={formatPhone(form.telefone || '')} onChange={(e) => handleChange({ target: { name: 'telefone', value: e.target.value.replace(/\D/g, '') } })} />
            <input name="vencimento_habilitacao" placeholder="Validade da CNH" required type="date" value={form.vencimento_habilitacao || ''} onChange={handleChange} min={calcularMinData()} max={calcularMaxData()} className='data' />
            <input name="email" type='email' placeholder="Email" onChange={handleChange} required autoComplete="off" value={form.email || ''} className='data' />
            <input type="password" name="senha" placeholder="Senha" required autoComplete="off" value={form.senha || ''} onChange={handleChange} className='data' />
          </>
        );
      case 'administrador':
        return (
          <>
            <input name="cpf" placeholder="CPF" required value={formatCpf(form.cpf || '')} onChange={(e) => handleChange({ target: { name: 'cpf', value: e.target.value.replace(/\D/g, '') } })} />
            <input name="nome" placeholder="Nome completo" onChange={handleChange} required value={form.nome || ''} />
            <input name="email" placeholder="Email" onChange={handleChange} required autoComplete="off" value={form.email || ''} />
            <input name="telefone" placeholder="Telefone" required value={formatPhone(form.telefone || '')} onChange={(e) => handleChange({ target: { name: 'telefone', value: e.target.value.replace(/\D/g, '') } })} />
            <input name="senha" placeholder="Senha" type="password" value={form.senha || ''} onChange={handleChange} required autoComplete="off" className='data' />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className='w-full'>
      <section className='cadastrar'>
        <div className='page-indicador'>
          <h1>Cadastrar Usuário</h1>
          <hr />
        </div>


        <select onChange={(e) => setTipo(e.target.value)} value={tipo} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 mb-5">
          <option value="">Selecionar tipo</option>
          <option value="aluno">Aluno e responsável</option>
          <option value="motorista">Motorista</option>
          <option value="administrador">Administrador</option>
        </select>

        {tipo && (
          <form onSubmit={handleSubmit} ref={formRef} className='flex flex-col gap-6 mt-6'>
            {renderCamposEspecificos()}
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mb-5 hover:bg-blue-700 transition duration-300 ease">Registrar</button>
          </form>
        )}
      </section >
    </div>

  );
}