import { Grid, Paper } from "@mui/material";
import { PageContentWrapper } from "../Application";
import { styled } from "@mui/material/styles";
import { customStyles } from "../Application";

const PaperItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  h3: { color: customStyles.longText },
  // h3: { color: theme.palette.text.primary },
  // TODO - *tmc* notice theme.palette.text.secondary is the same as custom?
  //      maybe need to find custom and change to this css?
  color: theme.palette.text.secondary,
}));

export const HomePage = (): JSX.Element => {
  return (
    <PageContentWrapper>
      <div style={{ margin: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <PaperItem>
              <section>
                <h3>For the geeks</h3>
                <p>Why this is awesome</p>
              </section>
            </PaperItem>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <section>
                <h3>For the Managers</h3>
                <p>Why this is awesome</p>
              </section>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </PageContentWrapper>
  );
};
