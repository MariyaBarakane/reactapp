/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
// Material Kit 2 React examples
import BackgroundBlogCard from "examples/Cards/BlogCards/BackgroundBlogCard";
// Images
import pluss from "assets/images/imgmed.jpg";
import axios from "axios";
import React, { useEffect, useState } from "react";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

function Meds() {
  const [listmedicament, setListmedicament] = useState([]);
  const handleClick = async (id) => {
    const res = await axios.get(`/api/disponibilite/${id}`);
    console.log(res.data);
  };
  useEffect(() => {
    const allmed = async () => {
      await api.get("/medicament").then((res) => {
        console.log(res.data.meds);
        setListmedicament(res.data.meds);
      });
    };
    allmed();
  }, []);

  return (
    <MKBox
      component="section"
      variant="gradient"
      bgColor="none"
      position="relative"
      py={6}
      px={{ xs: 2, lg: 0 }}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="h3" color="dark">
              Suggestions
            </MKTypography>
            <MKTypography variant="body2" color="dark" opacity={0.8}>
              All the availabe medication will be visible here
            </MKTypography>
          </Grid>
          <Grid container spacing={3}>
            {listmedicament.map((e) => (
              <Grid item xs={12} lg={4}>
                <MKBox mb={5}>
                  <BackgroundBlogCard image={pluss} title={e.nom} description={e.description} />
                  <li
                    /* eslint no-underscore-dangle: 0 */
                    key={e._id}
                    onClick={() => handleClick(e._id)}
                  >
                    <a href="/description"> {e.nom}</a>
                  </li>
                </MKBox>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Meds;
