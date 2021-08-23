import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Select, Button } from '@material-ui/core/';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { IconButton } from '@material-ui/core';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import SettingsIcon from '@material-ui/icons/Settings';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import SidebarOTN from './sidebar/sidebarotn';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: 'auto',
    overflow: 'hidden'
  },
  headBG: {
    backgroundColor: '#e0e0e0'
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    //height: '60%',
    //flex: '1 1 auto',
    //height: '66vh',
    height: '415px',
    //flexGrow: 1,
    //maxHeight:'60%',
    overflowY: 'auto'
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    //margin: theme.spacing(1),
    border: '1px solid #aaa',
    backgroundColor: theme.palette.background.paper,
    '& > *': {
      //margin: theme.spacing(0),
    },
    '& .MuiIconButton-root': {
      //padding: '5px 5px',
    },
    '& .MuiIconButton-root:hover': {
      backgroundColor: 'transparent'
    },
  },
  avatarAsIcon:{
     width: "100%", height: "100%", borderRadius: "50%",
     '& p':{
      display: "flex",
      width: "100%",
      height: "100%",
      color: "white",
      margin: "0",
      padding: "0",
      alignItems: "center",
      justifyContent: "center"
     }
  },
  dialogNoChat: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    color: "white"
  },
  dialogWrapBlock: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    margin: '10px',
    justifyContent: 'space-between',
    alignItems: 'center',
    '-webkit-font-smoothing': 'antialiased'
  },

  dialogWrapBlockLeft: {
    display: 'flex',
    flexDirection: 'column',
    '& span': {
      display: 'block',
      maxWidth: '180px',
      color: '#f5f5f5',
      fontSize: '0.9em',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    '& h5': {
      color: '#f5f5f5',
      fontWeight: 600,
      fontSize: '1em',
      maxWidth: '180px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    }
  },
  dialogWrapBlockRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    '& p': {
      margin: ["0", "0 0 5px 0"],
      padding: "0",
      color: "white",
      fontSize: "0.9em"
    },
    '& span': {
      display: "flex",
      borderRadius: "50%",
      fontSize: "0.9em",
      color: "white",
      fontWeight: 600,
      alignItems: "center",
      justifyContent: "center",
      width: "25px",
      height: "25px",
      backgroundColor: "#228d1c"
    }
  }

}));

const handleChange = () => {

}
const ChatOTN = () => {
  const classes = useStyles();
  const [lang, setLang] = useState(15);

  return (
    <div>
      <Grid container alignItems="center" style={{ border: '1px solid yellow' }}>
        <Grid item xs={9}>
          <FormControl fullWidth className={classes.paper}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Type to search ..."
            />
          </FormControl>

        </Grid>
        <Grid item xs={3}>
          <FormControl
            fullWidth
            size="small"
            className={classes.paper}
          >
            <Select
              name="visitDuration"
              displayEmpty
              variant="outlined"
              value={lang}
              onChange={handleChange}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value={15}>English</MenuItem>
              <MenuItem value={30}>Spanish</MenuItem>
            </Select>
          </FormControl>

        </Grid>

      </Grid>

      <Grid container className={classes.chatSection} >
        <Grid item xs={3}>
         
          <SidebarOTN />
          
        </Grid>
        <Grid item xs={9}>

          <div className={classes.flexContainer}>
            {/* <IconButton style={{ alignSelf: 'flex-start' }} >
                <ArrowBackIosOutlinedIcon style={{ color: 'red' }} />
                Back
              </IconButton> */}
            <IconButton>
              <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" sizes={{ width: '20px', height: '20px' }} />
            </IconButton>
            <IconButton>
              <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
            </IconButton>
            <IconButton>
              <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
            </IconButton>
            <IconButton>
              <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
            </IconButton>
            <IconButton>
              <AddCircleOutlineOutlinedIcon style={{ color: '#c4c4c4' }} />
            </IconButton>
            <Divider orientation="vertical" style={{ height: '30px', backgroundColor: '#aaa', marginLeft: '5px', marginRight: '5px' }} />
            <IconButton size="medium" >
              <VideocamOutlinedIcon style={{ color: '#c4c4c4' }} />
            </IconButton>
            <IconButton >
              <NotificationsOutlinedIcon style={{ color: '#c4c4c4' }} />
            </IconButton>
            <IconButton>
              <SettingsOutlinedIcon style={{ color: '#c4c4c4' }} />
            </IconButton>
          </div>




          <List className={classes.messageArea} style={{ border: '1px solid red' }}>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <Card className={classes.roots} style={{ backgroundColor: 'transparent' }}>
                    <CardHeader
                      avatar={
                        // <Avatar aria-label="recipe" >
                        //   R
                        // </Avatar>
                        <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" className={classes.avatar} />

                      }
                      // action={
                      //   <IconButton aria-label="settings">
                      //     <MoreVertIcon />
                      //   </IconButton>
                      // }
                      title="Shrimp and Chorizo Paella"
                      subheader="09:31"
                    />
                    <CardContent>
                      <Grid item xs={6} alignItems="center">
                        <Typography variant="body2" component="p" className={classes.userAnswer}>
                          This impressive paella is a perfect party dish and a fun meal to cook together with your
                          guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </ListItem>

            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <Card className={classes.roots} style={{ backgroundColor: 'transparent' }}>
                    <CardHeader
                      avatar={
                        // <Avatar aria-label="recipe" >
                        //   R
                        // </Avatar>
                        <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" className={classes.avatar} />

                      }
                      // action={
                      //   <IconButton aria-label="settings">
                      //     <MoreVertIcon />
                      //   </IconButton>
                      // }
                      title="Shrimp and Chorizo Paella"
                      subheader="09:31"
                    />
                    <CardContent>
                      <Grid item xs={6} alignItems="center">
                        <Typography variant="body2" component="p" className={classes.userAnswer}>
                          This impressive paella is a perfect party dish and a fun meal to cook together with your
                          guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <Card className={classes.roots} style={{ backgroundColor: 'transparent' }}>
                    <CardHeader
                      avatar={
                        // <Avatar aria-label="recipe" >
                        //   R
                        // </Avatar>
                        <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" className={classes.avatar} />

                      }
                      // action={
                      //   <IconButton aria-label="settings">
                      //     <MoreVertIcon />
                      //   </IconButton>
                      // }
                      title="Shrimp and Chorizo Paella"
                      subheader="09:31"
                    />
                    <CardContent>
                      <Grid item xs={6} alignItems="center">
                        <Typography variant="body2" component="p" className={classes.userAnswer}>
                          This impressive paella is a perfect party dish and a fun meal to cook together with your
                          guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <Card className={classes.roots} style={{ backgroundColor: 'transparent' }}>
                    <CardHeader
                      avatar={
                        // <Avatar aria-label="recipe" >
                        //   R
                        // </Avatar>
                        <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" className={classes.avatar} />

                      }
                      // action={
                      //   <IconButton aria-label="settings">
                      //     <MoreVertIcon />
                      //   </IconButton>
                      // }
                      title="Shrimp and Chorizo Paella"
                      subheader="09:31"
                    />
                    <CardContent>
                      <Grid item xs={6} alignItems="center">
                        <Typography variant="body2" component="p" className={classes.userAnswer}>
                          This impressive paella is a perfect party dish and a fun meal to cook together with your
                          guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </ListItem>


            <ListItem key="3">
              <Grid container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >

                <Grid item xs={6}>
                  <ListItemText align="right" secondary="09:31"></ListItemText>
                  <Typography variant="body2" component="p" align="right" className={classes.oppositeAnswer}>
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                  </Typography>

                </Grid>
              </Grid>
            </ListItem>
          </List>

          <Divider />
          <Grid container style={{ padding: '20px', border: '1px solid red' }}>
            <Grid item xs={11}>
              <TextField id="outlined-basic-email" label="Type Something" fullWidth />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add"><SendIcon /></Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ChatOTN;