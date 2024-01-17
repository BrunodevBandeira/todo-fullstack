// requests.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/todos';

// Função para configurar e retornar as funções de requisição
const configurarAPI = () => {
  // Função para realizar uma requisição GET
  const getDados = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      console.log('getDados response', response);

      console.log('getDados data', response.data);
      return response.data;

    } catch (error) {
      // Trate o erro conforme necessário
      console.error('Erro na requisição GET:', error);

      console.log('getDados error', response.data);
      throw error;
    }
  };

  // Função para realizar uma requisição POST
  const sendPostRequest = async ( dados) => {
    console.log('sendPostRequest - dados:', dados);
    let obj = {
      nome: dados.nameTask,
      descricao: dados.task
    }
    console.log('sendPostRequest - obj:', obj);
    try {
      const response = await axios.post(`${API_URL}`, obj, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('sendPostRequest - response:', response);
      console.log('sendPostRequest - response.data:', response.data);

      return response.data;
    } catch (error) {
      // Trate o erro conforme necessário
      console.error('Erro na requisição POST:', error);
      throw error;
    }
  };

  // Outras funções conforme necessário

  // Retornar as funções que deseja exportar
  return {
    getDados,
    sendPostRequest,
    // Outras funções conforme necessário
  };
};

export default configurarAPI;
