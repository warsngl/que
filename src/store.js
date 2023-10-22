import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('questions', {
  state: () => ({
    questions:null,
  }),
  actions: {
    async getQuestions(){
      await fetch("http://54.38.79.153:3000/api/surveys/649c5d9cd73b2d8a7b721517/answers")
      .then(res=>res.json())
      .then(json=>this.questions=json)
    }
  },
  getters:{
    getStats(state) {
      const stats = {};
      for (let q of state.questions) {
        if (q.answers[0]._qid) {
          if (stats[q.answers[0]._qid]) {
            stats[q.answers[0]._qid][q.answers[0].answer.option]
              ? stats[q.answers[0]._qid][q.answers[0].answer.option]++
              : (stats[q.answers[0]._qid][q.answers[0].answer.option] = 1);
          } else {
            stats[q.answers[0]._qid] = {};
          }
        }
      }
      return stats;
    },
  },
})
