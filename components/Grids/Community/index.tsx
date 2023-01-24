import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  card: {
    // height: 80,
    // width: 80,
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'flex-start',
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',

    transition: 'transform 900ms ease, box-shadow 900ms ease, filter 900ms ease',
    '&:hover': {
      transform: 'scale(1.02)',
      filter: 'brightness(70%)'
    },
  },

  containerLogos: {
    background: 'linear-gradient(to bottom, white, #275c67bb);',
    // maxHeight: '10em',
  },
  

  gradientTop: {
    // background: 'linear-gradient(to top, white, #072f37);'
  },
  
  gradientBot: {
    // background: 'linear-gradient(to bottom, white, #072f37);'
  }


}))

export default useStyles
