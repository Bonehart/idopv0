// import {
//   Box,
//   Button,
//   FormControl,
//   FormControlLabel,
//   FormHelperText,
//   Grid,
//   Radio,
//   RadioGroup,
//   TextField,
//   Typography,
// } from '@mui/material';
// import React, { useContext } from 'react';

// export const Newactivity = () => {
//   const [title, setTitle] = React.useState('');
//   const [content, setContent] = React.useState('');
//   const [category, setCategory] = React.useState('');
//   const [error, setError] = React.useState(null);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Add validation and submission logic here
//     console.log({ title, content, category });
//   };

//   return (
//     <Box sx={{ padding: 2, maxWidth: 800, margin: '0 auto',  marginTop: "20px",
//       border: '1px solid #ddd',
//       borderRadius: '8px',
//       boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
//      }}>
//       <Typography variant="h3" component="h1" textAlign="center" gutterBottom>
//         New Activity
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               id="title"
//               label="Title"
//               value={title}
//               variant="standard"
//               onChange={(event) => setTitle(event.target.value)}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               multiline
//               rows={10}
//               id="content"
//               label="Content"
//               value={content}
//               variant="standard"
//               onChange={(event) => setContent(event.target.value)}
//             />
//           </Grid>


//           <Grid item xs={12}>
//             <FormControl component="fieldset" error={!!error}>
//               <FormHelperText>Activity</FormHelperText>
//               <RadioGroup
//                 aria-label="category"
//                 name="category"
//                 value={category}
//                 onChange={(event) => setCategory(event.target.value)}
//               >              
//               </RadioGroup>
//               {error && <FormHelperText>{error}</FormHelperText>}
//             </FormControl>
//           </Grid>


//           <Grid item xs={6}>
//             <Button type="submit" variant="contained" color="primary" onClick={()=>{alert("you bad guy")}}>
//               Back
//             </Button>
//           </Grid>
//           <Grid item xs={6}>
//             <Button type="submit" variant="contained" color="primary" onClick={()=>{alert("you bad guy")}}>
//               Publish
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Box>
//   );
// };

// export default Newactivity;
import React from 'react';
import { Box, Grid, Typography, TextField } from '@mui/material';

export const Newactivity = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          width: 800,
          height: 700,
          borderRadius: 4,
          border: '1px solid black',
          padding: 4,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <Box
              sx={{
                height: '100%',
                border: 'solid 1px black',
                borderRadius: 4,
                padding: 2,
                height: '100px'
              }}
            >
              <Typography variant="h6">Component 1</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                height: '100%',
                border: 'solid 1px black',
                borderRadius: 4,
                padding: 2,
                height: '400px'
              }}
            >
                  <img
        src="https://picsum.photos/200/300"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        }}
      />
              {/* <Typography variant="h6">Component 2</Typography> */}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                height: '100%',
                border: 'solid 1px black',
                borderRadius: 4,
                padding: 2,
                height: '400px'
              }}
            >
 <TextField
   variant="standard"
        fullWidth
        multiline
        rows={16}
        placeholder="Type your text here..."
        sx={{
          border: 'none',
          padding: 0,
          '& .MuiInputBase-root': {
            padding: 0,
          },
        }}
      />

            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                height: '100%',
                border: '1px solid #f0f0f0',
                borderRadius: 4,
                padding: 2,
              }}
            >
              <Typography variant="h6">Component 3</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Newactivity;