// import { NextResponse } from 'next/server';
// import projects from '@/data/projects.json';
// import { baseUrl } from '@/data';
// import axios from 'axios';

// export async function GET() {
//   return NextResponse.json(projects);
// }

// export async function GET() {
//   const response = await axios.get(`${baseUrl}/projects`);
//   const data = response.data;
//   return NextResponse.json(data);
// }
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'projects.json');

// قراءة البيانات من الملف
const readProjectsData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { projects: [] };
  }
};

// كتابة البيانات إلى الملف
const writeProjectsData = (data: any) => {
  console.log(data)
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// الحصول على جميع المشاريع
export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const data = readProjectsData();
  if(searchParams.get("doctor") === "true"){
    data.projects = data.projects.filter((project: any) => project.supervisor?.email === searchParams.get("email"));
  }
  return NextResponse.json(data.projects);
}

// إضافة مشروع جديد
export async function POST(request: Request) {
  try {
    const newProject = await request.json();
    const data = readProjectsData();
    
    // توليد معرف فريد للمشروع
    newProject.id = Math.random().toString(36).substring(2, 15);
    
    data.projects.push(newProject);
    data.projects.reverse();
    // console.log("data.projects",data);
    writeProjectsData(data);
    
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إضافة المشروع' },
      { status: 500 }
    );
  }
}

// تحديث مشروع
export async function PUT(request: Request) {
  try {
    const updatedProject: any = await request.json();
    console.log("updatedProject.id",updatedProject.id);
    const data = readProjectsData();
    
    const index = data.projects.findIndex((p: any) => p.id === updatedProject.id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'المشروع غير موجود' },
        { status: 404 }
      );
    }
    console.log("updatedProject",updatedProject);
    data.projects[index] = updatedProject;
    data.projects.reverse();
    writeProjectsData(data);
    
    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث المشروع' },
      { status: 500 }
    );
  }
}

// حذف مشروع
export async function DELETE(request: Request) {
  try {
      const {searchParams} = new URL(request.url);
    const id = searchParams.get("id");
    if(!id){
      return NextResponse.json(
        { error: 'المشروع غير موجود' },
        { status: 404 }
      );
    }
    const data = readProjectsData();
    
    const index = data.projects.findIndex((p: any) => p.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'المشروع غير موجود' },
        { status: 404 }
      );
    }
    
    data.projects.splice(index, 1);
    data.projects.reverse();
    writeProjectsData(data);
    
    return NextResponse.json({ message: 'تم حذف المشروع بنجاح' });
  } catch (error) {
    return NextResponse.json(
      { error: 'حدث خطأ أثناء حذف المشروع' },
      { status: 500 }
    );
  }
}