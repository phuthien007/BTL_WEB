import React, { lazy, Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import Layout from 'layouts'

const routes = [
  // Dashboards
  {
    path: '/public/dashboard',
    Component: lazy(() => import('pages/dashboard/alpha')),
    exact: true,
  },
  // questions
  {
    path: '/public/questions/all-questions',
    Component: lazy(() => import('pages/questions/allQuestions')),
    exact: true,
  },
  {
    path: '/questions/ask-question',
    Component: lazy(() => import('pages/questions/askQuestions')),
    exact: true,
  },
  {
    path: '/public/questions/detail-question/:id',
    Component: lazy(() => import('pages/questions/detailQuestion')),
    exact: true,
  },
  {
    path: '/questions/detail-question/:id/edit-question',
    Component: lazy(() => import('pages/questions/editQuestions')),
    exact: true,
  },

  {
    path: '/public/questions/tag-questions',
    Component: lazy(() => import('pages/questions/tagQuestions')),
    exact: true,
  },

  // blogs
  {
    path: '/blogs/post-blog',
    Component: lazy(() => import('pages/blogs/postBlog')),
    exact: true,
  },
  {
    path: '/public/blogs/detail-blog/:id',
    Component: lazy(() => import('pages/blogs/detailBlog')),
    exact: true,
  },
  {
    path: '/public/blogs/all-blogs',
    Component: lazy(() => import('pages/blogs/allBlogs')),
    exact: true,
  },
  // users
  {
    path: '/users/all-users',
    Component: lazy(() => import('pages/users')),
    exact: true,
  },
  {
    path: '/users/detail-user/:id',
    Component: lazy(() => import('pages/users/detailUser')),
    exact: true,
  },
  // groups
  {
    path: '/public/groups',
    Component: lazy(() => import('pages/groups')),
    exact: true,
  },
  {
    path: '/public/groups/detail-group/:id',
    Component: lazy(() => import('pages/groups/detailGroup')),
    exact: true,
  },

  // Auth Pages
  {
    path: '/auth/login',
    Component: lazy(() => import('pages/auth/login')),
    exact: true,
  },
  {
    path: '/profile',
    Component: lazy(() => import('pages/apps/profile')),
    exact: true,
  },
  {
    path: '/auth/forgot-password',
    Component: lazy(() => import('pages/auth/forgot-password')),
    exact: true,
  },
  {
    path: '/auth/register',
    Component: lazy(() => import('pages/auth/register')),
    exact: true,
  },
  {
    path: '/auth/reset-password/:token',
    Component: lazy(() => import('pages/auth/reset-password')),
    exact: true,
  },
  {
    path: '/auth/404',
    Component: lazy(() => import('pages/auth/404')),
    exact: true,
  },
  {
    path: '/auth/500',
    Component: lazy(() => import('pages/auth/500')),
    exact: true,
  },
]

const mapStateToProps = ({ settings }) => ({
  routerAnimation: settings.routerAnimation,
})

const Router = ({ history, routerAnimation }) => {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Route
          render={state => {
            const { location } = state
            return (
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  appear
                  classNames={routerAnimation}
                  timeout={routerAnimation === 'none' ? 0 : 300}
                >
                  <Switch location={location}>
                    <Route exact path="/" render={() => <Redirect to="/public/dashboard" />} />
                    {routes.map(({ path, Component, exact }) => (
                      <Route
                        path={path}
                        key={path}
                        exact={exact}
                        render={() => {
                          return (
                            <div className={routerAnimation}>
                              <Suspense fallback={null}>
                                <Component />
                              </Suspense>
                            </div>
                          )
                        }}
                      />
                    ))}
                    <Redirect to="/auth/404" />
                  </Switch>
                </CSSTransition>
              </SwitchTransition>
            )
          }}
        />
      </Layout>
    </ConnectedRouter>
  )
}

export default connect(mapStateToProps)(Router)
