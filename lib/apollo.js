import { withData } from 'next-apollo';
import { HttpLink } from 'apollo-boost';

const config = {
  link: new HttpLink({
    uri: "https://api.paynup.com",
    opts: {
      credentials: "same-origin",
    }
  })
};

export default withData(config);
