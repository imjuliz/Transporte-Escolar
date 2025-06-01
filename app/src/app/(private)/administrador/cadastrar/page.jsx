// "use client";
// import { useState } from "react";

// {/**é preciso ajustar para que as rotas de registrar fiquem separadas para cada tipo de aluno (ex: o admin clica em registrar aluno, e vai ser um formulario só para registrar alunos) */}
// export default function RegistrarUsuario() {
//   const [resposta, setResposta] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = e.target;

//     // Pegando os dados do formulário
//     const formData = {
//       cpf: form.cpf.value,
//       email: form.email.value,
//       senha: form.senha.value,
//       tipo: form.tipo.value,
//     };

//     try {
//       const response = await fetch("http://localhost:3001/api/registrar", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json", // <-- importante
//           ///*"Authorization": "Bearer SEU_TOKEN_AQUI"
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       setResposta(JSON.stringify(data, null, 2));
//     } catch (error) {
//       console.error("Erro:", error);
//       setResposta("Erro ao enviar os dados.");
//     }
//   };

//   return (
//     <>
//       <h1>Registrar Usuário</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="cpf">CPF:</label>
//         <input type="text" id="cpf" name="cpf" required />

//         <label htmlFor="email">Email:</label>
//         <input type="text" id="email" name="email" required />

//         <label htmlFor="senha">Senha:</label>
//         <input type="password" id="senha" name="senha" required />

//         <label htmlFor="tipo">Tipo de Usuário</label>
//         <input type="text" id="tipo" name="tipo" required />

//         <button type="submit">Registrar Usuário</button>
//       </form>

//       <div>
//         <strong>Resposta do servidor:</strong>
//         <pre>{resposta}</pre>
//       </div>
//     </>
//   );
// }

'use client';

import { useRef, useState } from 'react';

export default function RegistroPage() {
  const [tipo, setTipo] = useState('');
  const [form, setForm] = useState({});
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const camposNumericos = ['escola_id', 'ponto_embarque_id', 'viagem_id', 'veiculo_id'];

    setForm((prev) => ({
      ...prev,
      [name]: camposNumericos.includes(name) ? (value ? parseInt(value, 10) : null) : value
    }));
  };

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
              veiculo_id: form.veiculo_id,
              senha: form.senha
            },
            responsavel: {
              cpf: form.cpf_responsavel,
              nome: form.nome_responsavel,
              email: form.email_responsavel,
              telefone: form.telefone_responsavel,
              senha: form.senha_responsavel,
              grau_parentesco: form.grau_parentesco
            }
          };
          break;

        case 'motorista':
          url = 'http://localhost:3001/cadastro/motorista';
          corpo = form;
          break;

        case 'administrador':
          url = 'http://localhost:3001/cadastro/administrador';
          corpo = form;
          break;

        default:
          return alert('Tipo de cadastro não suportado.');
      }

      const resposta = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo),
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

  const [nomeEscola, setNomeEscola] = useState('');
  const [escolas, setEscolas] = useState([]);
  const [pontoNome, setPontoNome] = useState('');

  const buscarEscolas = async (nome) => {
    if (!nome || nome.length < 2) return setEscolas([]);
    try {
      const res = await fetch(`http://localhost:3001/escolas?nome=${encodeURIComponent(nome)}`);
      const data = await res.json();
      setEscolas(data);
    } catch (err) {
      console.error('Erro ao buscar escolas:', err);
    }
  };

  const renderCamposEspecificos = () => {
    switch (tipo) {
      case 'aluno':
        return (
          <>
            <div className="relative z-0 w-full mb-5 group">
              <input name="cpf" onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none peer" placeholder=" " required maxLength={11} />
              <label htmlFor="cpf" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">CPF</label>
            </div>
            <input name="email" pattern="^[a-zA-Z0-9._%+-]+@al\.gov\.br$" placeholder="Email institucional" onChange={handleChange} required />
            <input name="nome" placeholder="Nome completo" onChange={handleChange} required />
            <input name="telefonePrinc" placeholder="Telefone" onChange={handleChange} required />
            <input name="dataNascimento" placeholder="Data de nascimento" onChange={handleChange} required />

            {/* Autocomplete da escola */}
            <div className="relative z-0 w-full mb-5 group">
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
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none peer"
                placeholder=" "
                autoComplete="off"
                required
              />
              <label
                htmlFor="escola_nome"
                className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 transition-all"
              >
                Nome da escola
              </label>

              {escolas.length > 0 && (
                <ul className="absolute z-20 w-full mt-2 bg-white border border-gray-300 max-h-40 overflow-y-auto rounded shadow">
                  {escolas.map((escola) => (
                    <li
                      key={escola.id}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      onClick={async () => {
                        setNomeEscola(escola.nome);
                        setEscolas([]);
                        handleChange({ target: { name: 'escola_id', value: escola.id } });

                        try {
                          const res = await fetch(`http://localhost:3001/ponto-por-escola?escolaId=${escola.id}`);
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
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="ponto_embarque_nome"
                defaultValue={pontoNome}
                disabled
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-gray-100 border-b-2 border-gray-300 appearance-none cursor-not-allowed peer"
                placeholder=" "
              />
              <label
                htmlFor="ponto_embarque_nome"
                className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 transition-all"
              >
                Ponto de embarque
              </label>
            </div>
            {/* ainda é preciso revisar os campos abaixo */}
            <input name="viagem_id" placeholder="ID da viagem" onChange={handleChange} required />
            <input name="veiculo_id" placeholder="ID do veículo" onChange={handleChange} required />
            <input name="senha" placeholder="Senha" type="password" onChange={handleChange} required />
            {/* Campos do Responsável */}
            <h2 className="text-lg font-semibold mt-6">Responsável</h2>
            <input name="cpf_responsavel" placeholder="CPF do responsável" onChange={handleChange} required />
            <input name="nome_responsavel" placeholder="Nome do responsável" onChange={handleChange} required />
            <input name="email_responsavel" placeholder="Email do responsável" onChange={handleChange} required />
            <input name="telefone_responsavel" placeholder="Telefone do responsável" onChange={handleChange} required />
            <input name="senha_responsavel" placeholder="Senha do responsável" type="password" onChange={handleChange} required />
            <input name="grau_parentesco" placeholder="Grau de parentesco" onChange={handleChange} required />
          </>
        );

      case 'motorista':
        return (
          <>
            <input name="cpf" placeholder="CPF" onChange={handleChange} required maxLength={11} />
            <input name="nome" placeholder="Nome completo" onChange={handleChange} required />
            <input name="cnh" placeholder="CNH" onChange={handleChange} required />
            <input name="telefone" placeholder="Telefone" onChange={handleChange} required />
            <input name="vencimento_habilitacao" placeholder="Vencimento da habilitação" onChange={handleChange} required />
            <input name="email" placeholder="Email" onChange={handleChange} required />
            <input name="senha" placeholder="Senha" type="password" onChange={handleChange} required />
          </>
        );

      case 'responsavel':
        return (
          <>
            <input name="cpf" placeholder="CPF" onChange={handleChange} required maxLength={11} />
            <input name="nome" placeholder="Nome completo" onChange={handleChange} required />
            <input name="email" placeholder="Email" onChange={handleChange} required />
            <input name="senha" placeholder="Senha" type="password" onChange={handleChange} required />
            <input name="cpf_filhos" placeholder="CPF dos filhos (separado por vírgulas)" onChange={handleChange} required />
          </>
        );

      case 'administrador':
        return (
          <>
            <input name="cpf" placeholder="CPF" onChange={handleChange} required maxLength={11} />
            <input name="nome" placeholder="Nome completo" onChange={handleChange} required />
            <input name="email" placeholder="Email" onChange={handleChange} required />
            <input name="senha" placeholder="Senha" type="password" onChange={handleChange} required />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className='w-full'>
      <h1>Cadastrar</h1>

      <select onChange={(e) => setTipo(e.target.value)} value={tipo} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500">
        <option value="">Selecionar tipo</option>
        <option value="aluno">Aluno</option>
        <option value="motorista">Motorista</option>
        <option value="responsavel">Responsável</option>
        <option value="administrador">Administrador</option>
      </select>

      {tipo && (
        <form onSubmit={handleSubmit} ref={formRef} className='flex flex-col gap-10 mt-6'>
          {renderCamposEspecificos()}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Registrar</button>
        </form>
      )}
    </div>
  );
}

