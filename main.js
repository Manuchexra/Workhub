import axios from 'axios';

const fetchProjects = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/projects/');
    console.log(response.data);
  } catch (error) {
    console.error("API so'rovida xato:", error);
  }
};


console.log("Axios import qilingan va kod ishlamoqda");
