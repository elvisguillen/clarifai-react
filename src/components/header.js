import React from 'react'
import Link from 'gatsby-link'
import {Col} from 'reactstrap'

import logo from '../images/logo.svg'

const Header = ({ siteTitle }) => (
  <Col
    md='2'
    xl='1'
    id='sticky-sidebar'
    className='main-header'
    style={{
      marginBottom: '1.45rem',
    }}

  >

        <Link
          to="/"
          className='logo d-flex justify-content-center'
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          <img className='d-flex justify-content-center' src={logo}/>
        </Link>

  </Col>
)

export default Header
