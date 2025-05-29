import { create, readAll, read, update, deleteRecord } from '../config/database.js';

// const TABLE = 'rotas';

// async function rotas() {
//   return await readAll(TABLE);
// }

// async function rotaPorId(id) {
//   return await read(TABLE, `id = ${id}`);
// }

// async function criarRota(data) {
//   return await create(TABLE, data);
// }

// async function atualizarRota(id, data) {
//   return await update(TABLE, data, `id = ${id}`);
// }

// async function deletarRota(id) {
//   return await deleteRecord(TABLE, `id = ${id}`);
// }

// export default { rotas, rotaPorId, criarRota, atualizarRota, deletarRota };


const listarViagens = async () => {
    const [results] = await readAll("viagens");
    return results;
};
export default { listarViagens };