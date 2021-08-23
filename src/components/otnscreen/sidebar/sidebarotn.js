import React, { useState } from 'react'
import { Button, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, TextField } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  sidebarButtonContainer: {
    //margin: theme.spacing(1),
    display: 'flex', justifyContent: 'space-between',
    padding: '7px 10px',
    alignItems: 'center',
    marginBottom: 0,
    border: '1px solid #e5e5e5'
  },
  dialogContainer: {
    position: "relative",
    width: "100%",
    backgroundColor: "white",
    '& > button': {
      width: "100%",
      padding: "7px",
      transition: "all 0.2s",
      border: "none",
      outline: "none",
      backgroundColor: "#32465a"
    },
    '& > button > span': {
      width: "100%",
      marginLeft: "10px",
      color: "#d2d2d2",
      fontSize: "14px"
    },
    '& > button:hover': {
      transition: "all 0.2s",
      backgroundColor: "#435f7a"
    }
  },
  dialogInfoContainer: {
    position: "relative",
    height: "calc(100vh - 231px)",
    '& ul': {
      margin: "0",
      padding: "0",
      listStyleType: "none"
    },
    '& ul li': {
      height: "75px",
      paddingLeft: "15px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderRight: "5px solid transparent",
      cursor: "pointer"
    },
    '& ul li:hover': {
      cursor: "pointer",
      background: "#32465a",
      borderRight: "5px solid #435f7a"
    }
  },
  avatarAsIcon: {
    width: "100%", height: "100%", borderRadius: "50%",
    '& p': {
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
  dialogNoChats: {
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


}))
const SidebarOTN = () => {
  const classes = useStyles()
  const [isLoader, setLoader] = useState(false)
  return (
    <div>
      {/* <List>
        <ListItem button key="RemySharp">
          <ListItemIcon>
            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
          </ListItemIcon>
          <ListItemText primary="John Wick"></ListItemText>
        </ListItem>
      </List> */}
      <div className={classes.sidebarButtonContainer} style={{ height: '60px' }}>
        <Button size="medium">
          All Conversations
        </Button>
        <Button variant="contained" color="primary" size="medium">
          New Message
        </Button>
      </div>
      <Divider />
      <Grid item xs={12} style={{ padding: '10px' }}>
        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
      </Grid>
      <Divider />
      <div className={classes.dialogContainer}>
        <div className={classes.dialogInfoContainer} id="dialog-info-container">
          {isLoader ?
            (
              <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
                Loading...
              </div>
            ) : false === 0 ?
              <div className={classes.dialogNoChats}>
                <h3>No chats yet</h3>
              </div> : true ?
                true > 0 ?
                  <ul>
                    <li>
                      <div className="dialog-wrap-avatar">
                        <div style={{ width: 50, height: 50 }}>
                          <div className={classes.avatarAsIcon} style={{ backgroundColor: 'green' }}>
                            <p style={{ fontSize: 10 }}>UM</p>
                          </div>
                        </div >
                      </div>
                      <div className={classes.dialogWrapBlock}>
                        <div className={classes.dialogWrapBlockLeft}>
                          <h5>Umar</h5>
                          <span>No messages yet</span>
                        </div>
                        <div className={classes.dialogWrapBlockRight}>
                          <p>4:90</p>
                          <span>4</span>
                        </div>
                      </div>
                    </li>

                  </ul> : <div className="dialog-no-chats">
                    <h3>No results</h3>
                  </div> : null
          }
        </div>
      </div>


    </div>
  )
}

export default SidebarOTN