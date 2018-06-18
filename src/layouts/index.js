import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {Col, Row} from 'reactstrap'

import Header from '../components/header'
import '../styles/index.scss'

const Layout = ({ children, data }) => (
  <Row>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header siteTitle={data.site.siteMetadata.title} />
    <Col
      md='11'
      className='main-content'
      // style={{
      //   margin: '0 auto',
      //   maxWidth: 960,
      //   padding: '0px 1.0875rem 1.45rem',
      //   paddingTop: 0,
      // }}
    >
      {children()}
    </Col>
  </Row>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
