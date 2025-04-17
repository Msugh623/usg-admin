import React, { createContext, useContext, useEffect, useState } from 'react'
import { requests } from '../../api/routes'
import { api } from '../../api/api'
import { toast } from 'react-toastify'

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
  const [subCommitees, setSubCommitees] = useState([])
  const [loaded,setLoaded]=useState(0)

  async function fetchData() {
    const tst = toast.loading(<Loader />, {
      progress:loaded/100
    })
    setIsFetching(true)
    if (localStorage.getItem('logintoken')) {
      api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('logintoken')
    }
    try {
      const resUsr = await requests.getAuthState()
      setUser(resUsr?.user)
      setLoaded(prev=>(prev+4.7))
    } catch (err) {
      console.log("ERROR: " + (err.message)||err)
    } finally {
      try {
        const resMedia = await requests.getIMedia()
        setLoaded(prev=>(prev+4.7))
        setGallery(resMedia)
        const resTest = await requests.getTestimonies()
        setLoaded(prev=>(prev+4.7))
        setTestimonies(resTest?.data)
        const resPrgs = await requests.getProgrammes()
        setLoaded(prev=>(prev+4.7))
        setProgrammes(resPrgs?.data)
        const resUsrs = await requests.getUsers()
        setLoaded(prev=>(prev+4.7))
        setUsers(resUsrs.data.map(usr => ({ ...usr, state: usr?.state || '' })))
        const resAmw = await requests.getAmw()
        setLoaded(prev=>(prev+4.7))
        setAmw(resAmw?.data)
        const resAms = await requests.getAms()
        setLoaded(prev=>(prev+4.7))
        setAms(resAms?.data[0] || {})
        const resImpact = await requests.getImpact()
        setLoaded(prev=>(prev+4.7))
        setImpact(resImpact?.data)
        const resEvents = await requests.getEvents()
        setLoaded(prev=>(prev+4.7))
        setEvents(resEvents?.data)
        const resResources = await requests.getResources()
        setLoaded(prev=>(prev+4.7))
        setResources(resResources?.data)
        const resAb = await requests.getAbout()
        setLoaded(prev=>(prev+4.7))
        setAbout(resAb?.data[0])
        const resNews = await requests.getNews()
        setLoaded(prev=>(prev+4.7))
        setNews(resNews?.latestNews)
        setFeatured(resNews?.featuredStory)
        setNotableUsrs(resUsrs.data.filter(usr => usr.notable))
        const ints = ([...(resUsrs.data.map(usr => usr.industry.map(ind => ind.split(', '))) || [])]).flat(2)
        setLoaded(prev=>(prev+4.7))
        const toSet = new Set(ints.flat())
        setLoaded(prev=>(prev+4.7))
        setIndustries([...toSet])
        const uprgs = ([...(resUsrs.data.map(usr => usr.programme.map(ind => ind.split(', '))) || [])]).flat(2)
        setLoaded(prev=>(prev+4.7))
        const uprgstoSet = new Set(uprgs.flat())
        setLoaded(prev=>(prev+4.7))
        setUPrograms([...uprgstoSet])
        const locs = ([...(resUsrs.data.map(usr => (usr?.state || '').replace('and ', ', ').split(', ')))]).flat(2).filter(item => Boolean(item))
        setLoaded(prev =>(prev + 4.7))
        const locToSet = new Set(locs)
        setLoaded(prev=>(prev+4.7))
        setLocations([...locToSet])
        const resChptrs = await requests.getChapters()
        setLoaded(prev=>(prev+4.7))
        setChapters(resChptrs?.data)
        const resLeaders = await requests.getLeaders()
        setLoaded(prev=>(prev+4.7))
        setLeaders(resLeaders?.data)
        const resSubCommitees = await requests.getSubcommitees()
        setLoaded(prev=>(prev+4.7))
        setSubCommitees(resSubCommitees?.data)
      } catch (err) {
        toast.error("ERROR: " + (err?.response?.data?.message || err?.message||err))
      } finally {
        setIsFetching(false)
        toast.dismiss(tst)
        setTimeout(() => setLoaded(0),400)
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
        setAms,
        subCommitees,
        leaders,
        loaded,
        setLoaded,
        setAmw,
        setImpact,
        setChapters,
        setResources,
        setNews,
      }}
    >
      {children}
    </context.Provider>
  );
}

export default StateContext

export const useStateContext = () => useContext(context)

function Loader() {
  const {loaded}=useStateContext()
  return <div className='me-auto text-left'>
    Fetching resources... {Math.round(loaded)}%
  </div>
}