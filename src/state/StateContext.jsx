import React, { createContext, useContext, useEffect, useState } from 'react'
import { requests } from '../../api/routes'
import { api } from '../../api/api'

const context = createContext()

const StateContext = ({ children }) => {
  const [title, setTitle] = useState('')
  const [user, setUser] = useState({})
  const [programmes, setProgrammes] = useState([])
  const [users, setUsers] = useState([])
  const [notableUsrs, setNotableUsrs] = useState([])
  const [modal, setModal] = useState('')
  const [industries, setIndustries] = useState([])
  const [uprograms, setUPrograms] = useState([])
  const [locations, setLocations] = useState([])
  const [gallery, setGallery] = useState([])
  const [resources, setResources] = useState([])
  const [testimonies, setTestimonies] = useState([])
  const [featured,setFeatured]=useState({})
  const [news, setNews] = useState([])
  const [impact, setImpact] = useState([])
  const [events, setEvents] = useState([])
  const [amw, setAmw] = useState([])
  const [ams, setAms] = useState([])
  const [chapters, setChapters] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [about, setAbout]=useState({})
  const [leaders, setLeaders]=useState([])
  const [subCommitees, setSubCommitees]=useState([])

  async function fetchData() {
    setIsFetching(true)
    if (localStorage.getItem('logintoken')) {
      api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('logintoken')
    }
    try {
      const resUsr = await requests.getAuthState()
      setUser(resUsr?.user)
    } catch (err) {
      console.log("ERROR: " + err.message)
    } finally {
      try {
        const resMedia = await requests.getIMedia()
        setGallery(resMedia)
        const resTest = await requests.getTestimonies()
        setTestimonies(resTest?.data)
        const resPrgs = await requests.getProgrammes()
        setProgrammes(resPrgs?.data)
        const resUsrs = await requests.getUsers()
        setUsers(resUsrs.data.map(usr => ({ ...usr, state: usr?.state || '' })))
        const resAmw = await requests.getAmw()
        setAmw(resAmw?.data)
        const resAms = await requests.getAms()
        setAms(resAms?.data[0] || {})
        const resImpact = await requests.getImpact()
        setImpact(resImpact?.data)
        const resEvents = await requests.getEvents()
        setEvents(resEvents?.data)
        const resResources = await requests.getResources()
        setResources(resResources?.data)
        const resAb = await requests.getAbout()
        setAbout(resAb?.data[0])
        const resNews = await requests.getNews()
        setNews(resNews?.latestNews)
        setFeatured(resNews?.featuredStory)
        setNotableUsrs(resUsrs.data.filter(usr => usr.notable))
        const ints = ([...(resUsrs.data.map(usr => usr.industry.map(ind => ind.split(', '))) || [])]).flat(2)
        const toSet = new Set(ints.flat())
        setIndustries([...toSet])
        const uprgs = ([...(resUsrs.data.map(usr => usr.programme.map(ind => ind.split(', '))) || [])]).flat(2)
        const uprgstoSet = new Set(uprgs.flat())
        setUPrograms([...uprgstoSet])
        const locs = ([...(resUsrs.data.map(usr => (usr?.state || '').replace('and ', ', ').split(', ')))]).flat(2).filter(item => Boolean(item))
        const locToSet = new Set(locs)
        setLocations([...locToSet])
        const resChptrs = await requests.getChapters()
        setChapters(resChptrs?.data)
        const resLeaders = await requests.getLeaders()
        setLeaders(resLeaders?.data)
        const resSubCommitees = await requests.getSubcommitees()
        setSubCommitees(resSubCommitees?.data)
      } catch (err) {
        console.log("ERROR: " + err.message)
      } finally {
        setIsFetching(false)
      }
    }
  }

  useEffect(() => {
    setIsFetching(true)
    fetchData()
  }, [])

  return (
    <context.Provider
      value={{
        title,
        setTitle,
        users,
        programmes,
        modal,
        setModal,
        industries,
        locations,
        notableUsrs,
        user,
        setUser,
        isFetching,
        setIsFetching,
        chapters,
        gallery,
        uprograms,
        resources,
        featured,
        news,
        fetchData,
        events,
        testimonies,
        impact,
        amw,
        about,
        ams,
        subCommitees,
        leaders
      }}

    >
      {children}
    </context.Provider>
  )
}

export default StateContext

export const useStateContext = () => useContext(context)
