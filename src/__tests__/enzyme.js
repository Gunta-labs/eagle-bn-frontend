import Enzyme, { configure, shallow, mount, render, simulate } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
export { shallow, mount, render, simulate };
export default Enzyme;
