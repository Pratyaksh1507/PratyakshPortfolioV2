import defaultData from './data.json'

export const state = () => ({
  projectData: defaultData.projectData,
  contactData: defaultData.contactData,
  pickupData: defaultData.pickupData,
  experienceData: defaultData.experienceData,
  experienceSummary: defaultData.experienceSummary,
});

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    if (!process.env.serviceDomain || !process.env.apiKey) {
      return
    }

    try {
      const projectResponse = await app.$axios.$get(`https://${process.env.serviceDomain}.microcms.io/api/v1/works?limit=200`, {
        headers: {
          'X-MICROCMS-API-KEY': process.env.apiKey
        }
      })
      const contactResponse = await app.$axios.$get(`https://${process.env.serviceDomain}.microcms.io/api/v1/contact?limit=200`, {
        headers: {
          'X-MICROCMS-API-KEY': process.env.apiKey
        }
      })
      const pickupData = projectResponse.contents.filter((v) => v.pickup.pickupFlag)

      commit('getProjectData', projectResponse.contents)
      commit('getContactData', contactResponse.contents)
      commit('getPickupData', pickupData)
    } catch (err) {
      // microCMS API request failed, fallback to default state
    }
  }
}

export const mutations = {
  getProjectData(state, data) {
    state.projectData = data
  },
  getContactData(state, data) {
    state.contactData = data
  },
  getPickupData(state, data) {
    state.pickupData = data
  },
  getExperienceData(state, data) {
    state.experienceData = data
  },
  getExperienceSummary(state, data) {
    state.experienceSummary = data
  },
}

export const getters = {
  projectData(state) {
    return state.projectData;
  },
  contactData(state) {
    return state.contactData;
  },
  pickupData(state) {
    return state.pickupData;
  },
  experienceData(state) {
    return state.experienceData;
  },
  experienceSummary(state) {
    return state.experienceSummary;
  },
};
