// General imports
import { expect } from 'chai';
import { step } from 'mocha-steps';

// Components and helpers
import Renderer from '../../../../client/test-helpers/apollo_renderer';
import routes from '../../../../client/app/routes';

describe('Western-suburbs UI works', () => {
  const renderer = new Renderer({});
  let app;
  let content;

  step('Western-suburbs page renders on mount', () => {
    app = renderer.mount(routes);
    renderer.history.push('/western-suburbs');
    content = app.find('#content');
    expect(content).to.not.be.empty;
  });
});
