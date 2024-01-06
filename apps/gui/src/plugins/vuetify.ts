// override vuetify styles
import { createVuetify } from 'vuetify';
import { mdi, aliases } from 'vuetify/iconsets/mdi';
import 'vuetify/styles';

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});
