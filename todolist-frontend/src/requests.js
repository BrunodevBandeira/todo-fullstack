import axios from 'axios';

const API_URL = 'http://localhost:8080/todos';

const configurarAPI = () => {

  const getDados = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      console.log('getDados response', response);

      console.log('getDados data', response.data);
      return response.data;

    } catch (error) {
      console.error('Erro na requisição GET:', error);

      console.log('getDados error', response.data);
      throw error;
    }
  };

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
      console.error('Erro na requisição POST:', error);
      throw error;
    }
  };

  const sendPutRequest = async ( dados) => {
    console.log('sendPutRequest - dados:', dados);

    let obj = {
      nome: dados.nameTask,
      descricao: dados.task
    }

    console.log('sendPutRequest - obj:', obj);

    try {
      const response = await axios.put(`${API_URL}`, obj, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('sendPutRequest - response:', response);
      console.log('sendPutRequest - response.data:', response.data);

      return response.data;
    } catch (error) {
      console.error('Erro na requisição PUT:', error);
      throw error;
    }
  };


  const deletePost = async (id) => {
    console.log('dellPost - id:', id);

    try {
      const response = await axios.delete(`${API_URL}/${id}`);

      console.log('dellPost - response:', response);
      console.log('dellPost - response.data:', response.data);

      return response.data;
    } catch (error) {
      console.error('Erro na requisição Dell:', error);
      throw error;
    }
  };

  return {
    getDados,
    sendPostRequest,
    sendPutRequest,
    deletePost
  };
};

export default configurarAPI;
