import { REACT_MOUNTING_POINT_ID } from '../constants/selectors';
import appHistory from '../appHistory';
import { AppLocation, renderRoute } from './renderRoute';

const initialLocation: AppLocation = {
  pathname: window.location.pathname,
  search: window.location.search
};

const mountingElement = document.getElementById(REACT_MOUNTING_POINT_ID);
renderRoute(initialLocation, mountingElement, true);
appHistory.listen(location => renderRoute(location, mountingElement));
