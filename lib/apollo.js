import { withData } from 'next-apollo';
import { HttpLink } from 'apollo-boost';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { IntrospectionFragmentData } from './fragment-types';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: IntrospectionFragmentData,
});

const cache = new InMemoryCache({fragmentMatcher});

const config = {
  link: new HttpLink({
    uri: "https://api.paynup.com",
    opts: {
      credentials: "same-origin",
    }
  }),
  cache,
};

export default withData(config);
