import { Avatar, Grid2, Paper, TextField , Button , Typography,Box, Stack} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/apiCalls/authApiCall";
import { useForm } from "react-hook-form";
function Login() {
 const dispatch = useDispatch();
      const { register, handleSubmit } = useForm();

      const onSubmit = async (FormData) => {
        dispatch(loginUser(FormData));
      };
  const paperStyle = {
    padding: 20,
    height: "430px",
    width: "400px",
    margin: "20px auto",
    display:"flex",
    flexDirection:"column",
    gap:"20px"
  };
    const avatarStyle = {
    background :"green",
    marginBottom :"15px"
    };
        const buttonStyle = {
      marginTop: "12px"
        };


      
  return (
    <Grid2>
      <Paper elevation={10} style={paperStyle}>
        <Grid2 align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon></LockOutlinedIcon>
          </Avatar>
          <h2>se connecter</h2>
        </Grid2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="email"
            variant="standard"
            placeholder="tapez vote email"
            fullWidth
            required
            type="email"
            {...register("email")}
          ></TextField>
          <TextField
            label="Mot de passe"
            variant="standard"
            placeholder="tapez vote mot de passe"
            fullWidth
            type="password"
            required
            {...register("password")}
          ></TextField>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={buttonStyle}
          >
            Connexion
          </Button>
          <Stack spacing={3}>
            <Typography variant="caption" style={{ fontSize: "14px", marginTop:"10px" }}>
              <Link to={"/"}>
                <span>Mot de passe oubliée ?</span>
              </Link>
            </Typography>

            <Typography variant="caption" style={{ fontSize: "16px" }}>
              Vous n'avez pas de compte ?{" "}
              <Link  style={{ fontWeight: "bold" }} to={"/register"}>
                S'inscrire
              </Link>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Grid2>
  );
}

export default Login;
