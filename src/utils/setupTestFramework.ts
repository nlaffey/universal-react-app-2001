import * as EnzymeAdapter from 'enzyme-adapter-react-16';
import * as Enzyme from 'enzyme';

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });
