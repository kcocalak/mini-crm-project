import { useUsers } from "../contenxt/UserContext";
import { Footer, FormRow } from "./ui/Modal/Modal.styles";
import { Formik, Form, Field } from 'formik';
import type { FormikHelpers } from 'formik';
import type { User } from "../constants/types/User";
import { faker } from "@faker-js/faker";
import { Modal } from "./ui/Modal/Modal";
import Button from "./ui/Button";
import Checkbox from "./ui/Checkbox";
import Toast from "./ui/Toast";
import Input from "./ui/Input";
import Select from "./ui/Select";
import { useState } from "react";

const roles = [
  'Admin',
  'Manager',
  'User',
  'Guest',
];

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  name: string;
  email: string;
  password: string;
  role: string;
  active: boolean;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose }) => {
  const { users, setUsers } = useUsers();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  return (
    <>
      <Modal open={open} onClose={onClose} title="Add User">
        <Formik<FormValues>
          initialValues={{
            name: '',
            email: '',
            password: '',
            role: '',
            active: true,
          }}
          validate={(values: FormValues) => {
            const errors: any = {};
            if (!values.name) errors.name = 'Name is required';
            if (!values.email) {
              errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Password is required';
            } else if (values.password.length < 6) {
              errors.password = 'Password must be at least 6 characters';
            }
            if (!values.role) errors.role = 'Role is required';
            return errors;
          }}
          onSubmit={(values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
            const newUser: User = {
              id: faker.string.uuid(),
              name: values.name,
              email: values.email,
              role: values.role,
              active: values.active,
              createDate: new Date(),
              location: {
                lat: faker.location.latitude(),
                lng: faker.location.longitude(),
              },
            };
            setUsers([...users, newUser]);
            setSubmitting(false);
            resetForm();
            onClose();
            showToast('User added successfully!', 'success');
          }}
        >
          {({ isSubmitting, isValid, errors, touched }: any) => {
            return(
            <Form>
              <FormRow>
                <Field name="name">
                  {({ field }: any) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Name"
                      error={touched.name && errors.name}
                    />
                  )}
                </Field>
              </FormRow>
              <FormRow>
                <Field name="email">
                  {({ field }: any) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email"
                      error={touched.email && errors.email}
                    />
                  )}
                </Field>
              </FormRow>
              <FormRow>
                <Field name="password">
                  {({ field }: any) => (
                    <Input
                      {...field}
                      type="password"
                      placeholder="Password"
                      error={touched.password && errors.password}
                    />
                  )}
                </Field>
              </FormRow>
              <FormRow>
                <Field name="role">
                  {({ field }: any) => (
                    <Select
                      {...field}
                      options={roles.map(role => ({ value: role, label: role }))}
                      placeholder="Select Role"
                      error={touched.role && errors.role}
                    />
                  )}
                </Field>
              </FormRow>
              <FormRow>
                <Field name="active">
                  {({ field, form }: any) => (
                    <Checkbox
                      checked={field.value}
                      onChange={(checked) => form.setFieldValue(field.name, checked)}
                      label="Active"
                    />
                  )}
                </Field>
              </FormRow>
              <Footer>
              <Button variant="outline" onClick={onClose} fullWidth>
                Close
              </Button>
              <Button type="submit" disabled={!isValid || isSubmitting} fullWidth>
                Add User
              </Button>
              </Footer>
            </Form>
          )}}
        </Formik>
      </Modal>
      
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          visible={!!toast}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}; 