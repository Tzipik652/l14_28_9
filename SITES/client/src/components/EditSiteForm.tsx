import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, Box } from "@mui/material";
import { siteSchema } from "./validation";

interface EditSiteFormProps {
  initialValues: { name: string; url: string; image: string; score: number };
  onSubmit: (values: any) => void;
}

const EditSiteForm: React.FC<EditSiteFormProps> = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={siteSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Box display="flex" flexDirection="column" gap={2} width={300}>
            <Field
              name="name"
              as={TextField}
              label="Name"
              error={touched.name && Boolean(errors.name)}
              helperText={<ErrorMessage name="name" />}
            />
            <Field
              name="image"
              as={TextField}
              label="Image"
              error={touched.image && Boolean(errors.image)}
              helperText={<ErrorMessage name="image" />}
            />


            <Field
              name="url"
              as={TextField}
              label="URL"
              error={touched.url && Boolean(errors.url)}
              helperText={<ErrorMessage name="url" />}
            />

            <Field
              name="score"
              as={TextField}
              type="number"
              label="Score (0-10)"
              inputProps={{ min: 0, max: 10 }}
              error={touched.score && Boolean(errors.score)}
              helperText={<ErrorMessage name="score" />}
            />

            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default EditSiteForm;
