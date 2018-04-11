import {createClient} from 'contentful'

const clientFactory = () => {
  return createClient({
    space: 'pjukj3n70qtm',
    accessToken: 'b6364846253f7f4bf9a7bab27f482f066582a7db44783779bbc96e797666c7fe'
  });
};

export default clientFactory;

