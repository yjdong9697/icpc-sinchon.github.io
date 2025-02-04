import { Provider } from 'react-redux'
import withRedux, { createWrapper } from 'next-redux-wrapper'
import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from '../reducers';

import '../styles/global.scss'
import '../styles/SeasonNav.scss'
import '../public/fonts/fonts.css'
import '../components/Arrow_Preview.scss'
import '../components/ContestWrap.scss'
import '../pages/index.scss'

const App = ({ Component, pageProps, store }) => {
  return (
    // 버전이 달라서 Provider로 감쌀 필요 없다 !!
    // https://darrengwon.tistory.com/557
    // <Provider store={store}>
    <Component {...pageProps} />
    // </Provider>
  )
}

const configStore = ctx => {

  const middleWares = []
  const enhancer = process.env.NODE_ENV === 'production' ?
    compose(applyMiddleware(...middleWares)) :
    composeWithDevTools(
      applyMiddleware(...middleWares)
    );

  if (!ctx.router || (ctx.router.pathname !== '/suapc' && ctx.router.pathname!=='/halloffame')) return createStore(reducer, enhancer)

  const data = require(`../public/history/${ctx.router.pathname.substring(1)}/${process.env.NEXT_PUBLIC_CURRENT_SUAPC_SEASON}.json`)
  const seasonList = require(`../public/history/${ctx.router.pathname.substring(1)}/list.json`)

  const initialState = {
    currentSeasonData: data,
    currentYear: data.year,
    currentSeason: data.season,
    currentSeasonIdx: seasonList.indexOf(process.env.NEXT_PUBLIC_CURRENT_SUAPC_SEASON),
    seasonList,
    isNavClicked: false
  }
  return createStore(reducer, initialState, enhancer);
}

// 전역적으로 props에 context를 넣어준다
App.getInitialProps = async context => {

  const { ctx, Component } = context;

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(ctx);
  }

  return { pageProps };
}

// store Props가 withRedux를 통해 주입된다.
export default createWrapper(configStore).withRedux(App)
// export default withRedux(configStore)(App)