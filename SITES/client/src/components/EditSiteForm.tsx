import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, Box } from "@mui/material";

interface EditSiteFormProps {
  initialValues: { name: string; url: string; image: string; score: number };
  onSubmit: (values: any) => void;
}

const EditSiteForm: React.FC<EditSiteFormProps> = ({
  initialValues,
  onSubmit,
}) => {
    const siteSchema = Yup.object({
      name: Yup.string().required("Name is required"),
      url: Yup.string().required("URL is required"),
      image: Yup.string().required("Image is required"),
      score: Yup.number()
        .min(0, "Score must be at least 0")
        .max(10, "Score cannot exceed 10")
        .required("Score is required"),
    });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={siteSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
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
