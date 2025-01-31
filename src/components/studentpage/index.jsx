import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, IconButton
} from "@mui/material";
import { Add, Edit, Delete, Visibility } from "@mui/icons-material";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import StudentForm from "../studentform";



const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      setStudents(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchStudents();
  }, [students]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "students", id));
  };

  return (
    <div className="bg-gray-100 h-screen w-screen">
    <div className=" flex-col justify-center justify-items-center">
              <h1 className="text-3xl font-bold mb-6 mt-2">STUDENTS DATA</h1>
      <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Add Student</Button>
      <div className="container">
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Roll Number</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.section}</TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>
                  <IconButton onClick={() => alert(JSON.stringify(student, null, 2))}><Visibility /></IconButton>
                  <IconButton onClick={() => { setSelectedStudent(student); setOpen(true); }}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(student.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      
      <StudentForm open={open} onClose={() => { setOpen(false); setSelectedStudent(null); }} student={selectedStudent} />
    </div>
    </div>
  );
};

export default StudentsPage;
