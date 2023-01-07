import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd'
import { connect } from 'react-redux'
import FavPages from './FavPages'
import Search from './Search'
// import IssuesHistory from './IssuesHistory'
// import ProjectManagement from './ProjectManagement'
import LanguageSwitcher from './LanguageSwitcher'
import Actions from './Actions'
import UserMenu from './UserMenu'
import style from './style.module.scss'

const mapStateToProps = ({ user }) => ({ user })

const TopBar = ({ user }) => {
  return (
    <div className={style.topbar}>
      <div className="mr-4">
        <FavPages />
      </div>
      <div className="mr-auto">
        <Search />
      </div>
      {/* <div className="mr-4 d-none d-md-block">
        <IssuesHistory />
      </div>
      <div className="mb-0 mr-auto d-xl-block d-none">
        <ProjectManagement />
      </div> */}
      <div className="mr-4 d-none d-sm-block">
        <LanguageSwitcher />
      </div>
      <div className="mr-4 d-none d-sm-block">
        <Actions />
      </div>
      <div className="">
        {user.authorized ? (
          <UserMenu />
        ) : (
          <>
            <Button icon={<i className="fa fa-user mr-2" />} type="link" className="mr-2">
              Sign in
            </Button>
            <Button type="link">Sign up</Button>
          </>
        )}
      </div>
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(TopBar))
