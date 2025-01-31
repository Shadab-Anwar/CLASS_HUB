import React, { useEffect } from "react";
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const StudentForm = ({ open, onClose, student }) => {
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (student) reset(student);
    else reset({});
  }, [student, reset]);

  const onSubmit = async (data) => {
    if (student) {
      await updateDoc(doc(db, "students", student.id), data);
    } else {
      await addDoc(collection(db, "students"), data);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{student ? "Edit Student" : "Add Student"}</DialogTitle>
      <DialogContent>
        <Controller name="name" control={control} defaultValue="" render={({ field }) => (
          <TextField {...field} label="Name" fullWidth margin="dense" required />
        )} />
        <Controller name="class" control={control} defaultValue="" render={({ field }) => (
          <TextField {...field} label="Class" fullWidth margin="dense" required />
        )} />
        <Controller name="section" control={control} defaultValue="" render={({ field }) => (
          <TextField {...field} label="Section" fullWidth margin="dense" required />
        )} />
        <Controller name="rollNumber" control={control} defaultValue="" render={({ field }) => (
          <TextField {...field} label="Roll Number" type="number" fullWidth margin="dense" required />
        )} />
        <Controller name="dob" control={control} defaultValue="" render={({ field }) => (
          <TextField {...field} label="Date of Birth" type="date" fullWidth margin="dense" InputLabelProps={{ shrink: true }} required />
        )} />
        <Controller name="gender" control={control} defaultValue="" render={({ field }) => (
          <TextField {...field} label="Gender" select fullWidth margin="dense" required>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        )} />
        <Controller name="email" control={control} defaultValue="" render={({ field }) => (
          <TextField {...field} label="Email" type="email" fullWidth margin="dense" required />
        )} />
        <Controller name="parentContact" control={control} defaultValue="" render={({ field }) => (
          <TextField {...field} label="Parent Contact" type="tel" fullWidth margin="dense" required />
        )} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentForm;
