import { PortalHost, PortalGuard } from './ProviderConsumer';

const Portal = new PortalGuard();

Portal.Provider = PortalHost;

export default Portal;
