import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from 'reactstrap';

import NavBar from './nav_bar';

const footerHeight = '40px';

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  line-height: ${footerHeight};
  height: ${footerHeight};
`;

const Page = ({stockExample, children, navBar}) => {
  return (
    <section>
      {navBar !== false && <NavBar />}
      <Container id="content">
        {children}
      </Container>
      <Footer>
        <div className="text-center">
          {
            stockExample
              ? "\u00A9 2017. Example Apollo App."
              : "\u00A9 2017. bubble-dragons.com"
          }
        </div>
      </Footer>
    </section>
  );
};

Page.propTypes = {
  children: PropTypes.node,
  navBar: PropTypes.bool,
  stockExample: PropTypes.bool
};

export default Page;
