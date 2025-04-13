import { api,usgOrigin,path } from "./api";

class Routes {
  // Auth
  login = "/auth/login"
  logout='/auth/logout'
  sessionLogin = "/auth/session-login"
  googleLogin='/auth/google'
  authState = '/auth/loggedInUser'

  // User
  users = "/user/all-users";
  signup = '/user/signup'
  updateusr = '/user/update'

  programmes = "/programme";
  chapters = '/chapter'
  resources = '/resources'
  testimonies='/testimonies'
  news = '/news'
  events = '/event'
  impact = '/impact'
  leaders = '/leaders'
  subcommittee = '/subcommittee'
  amw = '/amw'
  ams='/alumni-spot'
  aboutUs = '/aboutus'
  imedia='/gallery'
  eSub = '/user/email-sub';
  contact = '/user/contact'
}

class Request extends Routes {
  usrlogin = async (state) => {
    const res = await api.post(this.login, {
      ...state
    });
    return res.data;
  };

  usrSessionLogin = async (state) => {
    const res = await api.post(this.login, state);
    return res.data;
  };

  usrSignup = async (state) => {
    const res = await api.post(this.signup, state);
    return res.data;
  };

  useGoogleAuth = async () => {
    location.href = usgOrigin+path+this.googleLogin
    return null
  };

  usrUpdate = async (state) => {
    const res = await api.put(this.updateusr, state);
    return res.data;
  };

  getProgrammes = async () => {
    const res = await api.get(this.programmes);
    return res.data;
  };

  getTestimonies = async () => {
    const res = await api.get(this.testimonies);
    return res.data;
  };

  getChapters = async () => {
    const res = await api.get(this.chapters);
    return res.data;
  };

  getNews = async () => {
    const res = await api.get(this.news);
    return res.data;
  };

  getImpact = async () => {
    const res = await api.get(this.impact);
    return res.data;
  };

  getEvents = async () => {
    const res = await api.get(this.events);
    return res.data;
  };

  getProgram = async (id) => {
    const res = await api.get((this.programmes) + '/' + id);
    return res.data;
  };

  getUsers = async () => {
    const res = await api.get(this.users);
    return res.data;
  };

  getIMedia = async () => {
    const res = await api.get(this.imedia);
    return res.data?.data;
  };

  getAmw = async () => {
    const res = await api.get(this.amw);
    return res.data;
  };

  postAmw = async (state) => {
    const res = await api.post(this.amw,state);
    return res.data;
  };

  putAmw = async (id,state) => {
    const res = await api.put(this.amw+id,state);
    return res.data;
  };

  deleteAmw = async (id) => {
    const res = await api.delete(this.amw+id);
    return res.data;
  };

  getAms = async () => {
    const res = await api.get(this.ams);
    return res.data;
  };

  getResources = async () => {
    const res = await api.get(this.resources);
    return res.data;
  };

  getAbout = async () => {
    const res = await api.get(this.aboutUs);
    return res.data;
  };

  getLeaders = async () => {
    const res = await api.get(this.leaders);
    return res.data;
  };

  getSubcommitees = async () => {
    const res = await api.get(this.subcommittee);
    return res.data;
  };

  getAuthState = async () => {
    const res = await api.get(this.authState);
    return res.data;
  };

  usrLogout = async () => {
    const res = await api.get(this.logout);
    localStorage.removeItem('logintoken')
    location.href = location.origin
    return res.data;
  };

  sub = async (email) => {
    const res = await api.post(this.eSub, {
      email
    })
    return res.data
  }
  send = async (state) => {
    const res = await api.post(this.contact, {
      ...state
    })
    return res.data
  }
}

export const routes = new Routes();
export const requests = new Request();
