import westernSuburbs from './western-suburbs';
import counter from './counter';
import './debug';
import post from './post';

import Feature from './connector';

export default new Feature(westernSuburbs, counter, post);
