import React, { useMemo } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import NewsCard from "./newsCard";

const TabComponent = () => {
  const [value, setValue] = React.useState("General");
  const tabsCategories = useMemo(
    () => ["General", "Education", "Schemes", "Articles"],
    []
  );

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} variant="fullWidth">
            {tabsCategories.map((tabsCategory) => (
              <Tab
                label={tabsCategory}
                value={tabsCategory}
                key={tabsCategory}
              />
            ))}
          </TabList>
        </Box>
        {tabsCategories.map((tabsCategory) => (
          <TabPanel value={tabsCategory} key={tabsCategory}>
            <NewsCard category={tabsCategory} />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default TabComponent;
