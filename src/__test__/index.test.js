impot * as testRenderer from 'react-test-renderer';
import {mountToReactRoot, getAllSlowComponentRenders, getCircularReplacer} from '../utils/utils';

function Link(props) {
  return <a href={props.page}>{props.children}</a>;
}

describe('getAllSlowComponentRenders function', () => {
  it('should get the slow component renders', () => {
    const testRenderer = TestRenderer.create(<Link page="https://www.facebook.com/">Facebook</Link>);
    testRenderer.root._fiber.selfBaseDuration = 15; // fake render time in milliseconds
    const testFiberArray = [JSON.stringify(testRenderer.root._fiber, getCircularReplacer())];

    expect(getAllSlowComponentRenders(14, testFiberArray)).toHaveLength(1);
  });
});
