import axios from 'axios'
import create from 'zustand'

const useStore = create((set) => ({
  submitjawaban: {},
  postAnswer: async () => {
    const response = await axios.post('http://localhost:8080/api/siswa/finish-ujian',
      {
        id_mata_pelajaran: 1,
        jawabans: [{
          "answer": "A",
          "id_soal": 1
        }]
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    set.submitjawaban(response.data.data)
    console.log('Berhasil submit jawaban', response)
  }
}))

export default useStore