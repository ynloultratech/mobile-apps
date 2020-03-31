import React from 'react';
import PropTypes from 'prop-types';
import ReactWOW from 'react-wow';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from '~/i18n';
import useStyles from './logo-style';

const logos = [
  'https://static.wixstatic.com/media/524475_8533f9ac811a473b8b8db83378ef673c~mv2.png/v1/fill/w_152,h_151,al_c,q_85,usm_0.66_1.00_0.01/tricom.webp',
  'https://static.wixstatic.com/media/524475_f7e24ffe8e0848de9685da964670ced0~mv2.png/v1/fill/w_133,h_130,al_c,q_85,usm_0.66_1.00_0.01/claro.webp',
  'https://static.wixstatic.com/media/524475_92506e339bfe447e8facebdd217b55ba~mv2.png/v1/fill/w_142,h_130,al_c,q_85,usm_0.66_1.00_0.01/etisalat.webp',
  'https://static.wixstatic.com/media/524475_f74e893baa8f4e1990cdeac5f59d229e~mv2.png/v1/fill/w_133,h_130,al_c,q_85,usm_0.66_1.00_0.01/avea.webp',
  'https://static.wixstatic.com/media/524475_9c0a2a46a91e4c4c9f67ae4db2b28c41~mv2.png/v1/fill/w_152,h_151,al_c,q_85,usm_0.66_1.00_0.01/8ta.webp',
  'https://static.wixstatic.com/media/524475_cbcfafa8454944d091e7787e9de2171d~mv2.png/v1/fill/w_133,h_130,al_c,q_85,usm_0.66_1.00_0.01/airtel.webp',
  'https://static.wixstatic.com/media/524475_44dc920cae5d491d80b58e3e28ed6423~mv2.png/v1/fill/w_142,h_130,al_c,q_85,usm_0.66_1.00_0.01/alegro.webp',
  'https://static.wixstatic.com/media/524475_0c7aacc0496b49be939fceb954f5ccac~mv2.png/v1/fill/w_133,h_130,al_c,q_85,usm_0.66_1.00_0.01/banglalink.webp',
  'https://static.wixstatic.com/media/524475_2df7f53d09de4ff7bbe468456f9ca8d6~mv2.png/v1/fill/w_152,h_151,al_c,q_85,usm_0.66_1.00_0.01/bayn.webp',
  'https://static.wixstatic.com/media/524475_6bcfbbf182614375b04650de206a2a78~mv2.png/v1/fill/w_133,h_130,al_c,q_85,usm_0.66_1.00_0.01/beeline.webp',
  'https://static.wixstatic.com/media/524475_0dd37b1b92df4d57bacab637dc9df0f3~mv2.png/v1/fill/w_142,h_130,al_c,q_85,usm_0.66_1.00_0.01/carrefour.webp',
  'https://static.wixstatic.com/media/524475_4d2fa5848a6841d59d33d5b48d4383e0~mv2.png/v1/fill/w_133,h_130,al_c,q_85,usm_0.66_1.00_0.01/cubacell.webp',
  'https://static.wixstatic.com/media/524475_72f99a4bbbdf45e280e3d909e0b0f90f~mv2.png/v1/fill/w_152,h_151,al_c,q_85,usm_0.66_1.00_0.01/dialog.webp',
  'https://static.wixstatic.com/media/524475_de64e8902272447c86334a74bbb4fbf0~mv2.png/v1/fill/w_133,h_130,al_c,q_85,usm_0.66_1.00_0.01/digicel.webp',
  'https://static.wixstatic.com/media/524475_2499bc2152874e3084695f6e25088d3f~mv2.png/v1/fill/w_142,h_130,al_c,q_85,usm_0.66_1.00_0.01/gtt.webp',
  'https://static.wixstatic.com/media/524475_207b86ca3ee846aa9dd1b13b2a1783d1~mv2.png/v1/fill/w_133,h_130,al_c,q_85,usm_0.66_1.00_0.01/oi.webp',
];

function CompanyLogo(props) {
  const classes = useStyles();
  const { t } = props;
  const chunks = [];
  const clogos = [...logos];

  while (clogos.length) {
    chunks.push(clogos.splice(0, 4));
  }

  return (
    <Container fixed>
      <Typography
        align="center"
        variant="h4"
        className={classes.title}
      >
        {t('mobile-landing:company_title')}
      </Typography>
      <ReactWOW animation="fadeInUpShort" offset={-200} delay="0.3s" duration="0.5s">
        {chunks.map((items, i) => (
          <div className={classes.root} key={i.toString()}>
            {items.map((logo, index) => (
              <img src={logo} alt={'logo' + index.toString()} key={index.toString()} />
            ))}
          </div>
        ))}
      </ReactWOW>
    </Container>
  );
}

CompanyLogo.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['mobile-landing'])(CompanyLogo);
