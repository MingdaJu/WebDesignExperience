import Vue from 'vue'
import Router from 'vue-router'

const FileList = resolve => require(['../views/file/List'],resolve)
const Issue = resolve => require(['../views/issue/Issue'],resolve)
const IssueDetail = resolve => require(['../views/issue/IssueDetail'],resolve)
const Home = resolve => require(['../views/home/Home'],resolve)
const Search = resolve => require(['../views/home/Search'],resolve)
const User = resolve => require(['../views/user/User'],resolve)
const Log = resolve => require(['../views/user/Log'],resolve)
const Auth = resolve => require(['../views/user/Auth'],resolve)
const Video = resolve => require(['../views/video/video'],resolve)
const News = resolve => require(['../views/news/news'],resolve)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/video',
      name: 'Video',
      component: Video
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/user',
      name: 'UserList',
      component: User
    },
    {
      path: '/log',
      name: 'Log',
      component: Log
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/file',
      name: 'FileList',
      component: FileList
    },
    {
      path: '/issue',
      name: 'Issue',
      component: Issue
    },
    {
      path: '/issuedetail',
      name: 'IssueDetail',
      component: IssueDetail
    }
  ]
})