import {
  Avatar,
  Grid2,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/apiCalls/authApiCall";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [terms, setTerms] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (formData) => {
    dispatch(registerUser(formData));
    navigate("/login");
  };

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: "400px",
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };
  const avatarStyle = {
    background: "green",
    marginBottom: "15px",
  };
  const buttonStyle = {
    marginTop: "12px",
  };
  const headerStyle = {
    margin: 0,
  };

  return (
    <Grid2>
      <Paper elevation={10} style={paperStyle}>
        <Grid2 align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineIcon />
          </Avatar>
          <h2 style={headerStyle}>s'inscrire</h2>
          <Typography variant="caption">Remplissez ce formulaire</Typography>
        </Grid2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Nom et Prénom"
            variant="standard"
            placeholder="Tapez votre nom et prénom"
            fullWidth
            required
            {...register("username", { required: "Ce champ est obligatoire." })}
            error={!!errors.username}
            helperText={errors.username ? errors.username.message : ""}
          />

          <TextField
            label="Email"
            variant="standard"
            placeholder="Tapez votre email"
            fullWidth
            required
            type="email"
            {...register("email", {
              required: "Ce champ est obligatoire.",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Veuillez entrer un email valide",
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />

          <TextField
            label="Mot de passe"
            variant="standard"
            placeholder="Tapez votre mot de passe"
            fullWidth
            type="password"
            required
            {...register("password", { required: "Ce champ est obligatoire." })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />

          <TextField
            label="Organisation"
            variant="standard"
            placeholder="Tapez le nom de votre organisation"
            fullWidth
            required
            {...register("organisation", {
              required: "Ce champ est obligatoire.",
            })}
            error={!!errors.organisation}
            helperText={errors.organisation ? errors.organisation.message : ""}
          />

          <TextField
            label="Téléphone"
            variant="standard"
            fullWidth
            required
            type="text"
            {...register("phone", {
              required: "Ce champ est obligatoire.",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Veuillez entrer un numéro de téléphone valide",
              },
            })}
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : ""}
          />

          <TextField
            label="Secteurs"
            variant="standard"
            fullWidth
            required
            {...register("secteurs", {
              required: "Ce champ est obligatoire.",
            })}
            error={!!errors.secteurs}
            helperText={errors.secteurs ? errors.secteurs.message : ""}
          />

          <TextField
            label="CPI"
            type="text"
            variant="standard"
            fullWidth
            required
            {...register("cpi", {
              required: "Ce champ est obligatoire.",
            })}
            error={!!errors.cpi}
            helperText={errors.cpi ? errors.cpi.message : ""}
          />

          <FormControl
            fullWidth
            required
            variant="standard"
            error={!!errors.competence}
          >
            <InputLabel id="status-select-label">Compétence</InputLabel>
            <Select
              labelId="status-select-label"
              defaultValue=""
              {...register("competence", {
                required: "Ce champ est obligatoire.",
              })}
            >
              <MenuItem value="">
                <em>Choisissez une compétence</em>
              </MenuItem>
              <MenuItem value="competence1">compétence1</MenuItem>
              <MenuItem value="competence2">compétence2</MenuItem>
              <MenuItem value="competence3">compétence3</MenuItem>
            </Select>
            {errors.competence && (
              <p style={{ color: "red" }}>{errors.competence.message}</p>
            )}
          </FormControl>

          <Controller
            name="termsAccepted"
            control={control}
            render={({ field }) => (
              <FormControl error={!terms}>
                <FormControlLabel
                  label={
                    <Typography variant="caption">
                      <span>
                        Accepter les
                        <Link to="/conditions-utilisation">
                          termes et conditions d'utilisation
                        </Link>
                      </span>
                    </Typography>
                  }
                  control={
                    <Checkbox
                      checked={terms}
                      required
                      onChange={(e) => {
                        setTerms(e.target.checked);
                        field.onChange(e.target.checked);
                      }}
                    />
                  }
                />
              </FormControl>
            )}
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={buttonStyle}
            disabled={isSubmitting} // Disable button while submitting
          >
            s'inscrire
          </Button>
        </form>
      </Paper>
    </Grid2>
  );
}

export default Register;
