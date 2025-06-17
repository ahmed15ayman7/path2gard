"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "@/components/icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Search, Check, X } from "@/components/icons";
// import { useProjectStore } from "@/lib/zustand";

interface ProjectField {
  id: string;
  name: string;
}

interface Supervisor {
  id: string;
  image: string;
  name: string;
  field: string;
  email: string;
}

interface Member {
  id: string;
  image: string;
  name: string;
  field?: ProjectField;
}

let Students = [{ email: "john.doe@student.edu", password: "student123",name:"John Doe" }, { email: "jane.smith@student.edu", password: "student456",name:"Jane Smith" }, { email: "robert.johnson@student.edu", password: "student789",name:"Robert Johnson" }, { email: "emily.davis@student.edu", password: "student012",name:"Emily Davis" }, { email: "michael.wilson@student.edu", password: "student345",name:"Michael Wilson" }, { email: "sarah.brown@student.edu", password: "student678",name:"Sarah Brown" }, { email: "david.taylor@student.edu", password: "student901",name:"David Taylor" }, { email: "jessica.anderson@student.edu", password: "student234",name:"Jessica Anderson" }, { email: "thomas.martinez@student.edu", password: "student567",name:"Thomas Martinez" }, { email: "lisa.robinson@student.edu", password: "student890",name:"Lisa Robinson" }, { email: "james.clark@student.edu",password: "student112",name:"James Clark" }, { email: "patricia.lewis@student.edu",password: "student113",name:"Patricia Lewis" }, { email: "christopher.lee@student.edu",password: "student114",name:"Christopher Lee" }, { email: "amanda.walker@student.edu",password: "student115",name:"Amanda Walker" }, { email: "matthew.hall@student.edu",password:"student116",name:"Matthew Hall"}]

let Doctors = [{ email: "smith@university.edu", password: "smith123",name:"Dr. Smith" }, { email: "johnson@university.edu", password: "johnson123",name:"Dr. Johnson" }, { email: "williams@university.edu", password: "williams123",name:"Dr. Williams" }, { email: "brown@university.edu", password: "brown123",name:"Dr. Brown" }, { email: "davis@university.edu", password: "davis123",name:"Dr. Davis" }]

const CustomizeProject = () => {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [projectBrief, setProjectBrief] = useState("");
  const [selectedFields, setSelectedFields] = useState<ProjectField[]>([]);
  const [teamSize, setTeamSize] = useState(4);
  const [fields, setFields] = useState<ProjectField[]>([]);
  const [openFieldsPopover, setOpenFieldsPopover] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupervisor, setSelectedSupervisor] = useState<Supervisor | null>(null);
  const [selectedCoSupervisor, setSelectedCoSupervisor] = useState<Supervisor | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [requestedSupervisors, setRequestedSupervisors] = useState<string[]>([]);
  const [requestedMembers, setRequestedMembers] = useState<string[]>([]);
  const [memberFields, setMemberFields] = useState<{ [key: number]: ProjectField[] }>({});
  const [openMemberFieldsPopover, setOpenMemberFieldsPopover] = useState<{ [key: number]: boolean }>({});
  const [memberFieldsSearchQuery, setMemberFieldsSearchQuery] = useState('');

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get("/api/project-fields");
        setFields(response.data.fields);
      } catch (error) {
        console.error("Error fetching fields:", error);
      }
    };

    fetchFields();
  }, []);

  const filteredFields = fields.filter((field) => {
    if (!searchQuery) return true;
    return field.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
  });

  const handleTeamSizeClick = (size: number) => {
    setTeamSize(size);
  };

  const handleFieldSelect = (field: ProjectField) => {
    setSelectedFields((prev) => {
      const exists = prev.some((f) => f.id === field.id);
      if (!exists) {
        return [...prev, field];
      }
      return prev;
    });
  };

  const handleFieldRemove = (fieldId: string) => {
    setSelectedFields((prev) => prev.filter((field) => field.id !== fieldId));
  };

  const toggleMemberField = (index: number, field: ProjectField) => {
    setMemberFields(prev => {
      const currentFields = prev[index] || [];
      const isSelected = currentFields.some(f => f.id === field.id);
      
      if (isSelected) {
        return {
          ...prev,
          [index]: currentFields.filter(f => f.id !== field.id)
        };
      } else {
        return {
          ...prev,
          [index]: [...currentFields, field]
        };
      }
    });
  };

  const removeMemberField = (index: number, fieldId: string) => {
    setMemberFields(prev => ({
      ...prev,
      [index]: (prev[index] || []).filter(field => field.id !== fieldId)
    }));
  };

  const filteredMemberFields = fields.filter(field =>
    field.name.toLowerCase().includes(memberFieldsSearchQuery.toLowerCase())
  );

  const supervisors = Doctors.map((doctor,index) => ({
    id: doctor.email,
    image: index%2==0?"/images/user1.jpg":"/images/user2.jpg",
    name: doctor.name,
    field: index==0?"AI":index==1?"Security":index==2?"Web":index==3?"Mobile":"AI",
    role: "Doctor",
    email: doctor.email,
  }));
  const members = Students.map((student,index) => ({
    id: student.email,
    image: index%2==0?"/images/user1.jpg":"/images/user2.jpg",
    name: student.name,
      field: {
        id: index==0?"1":index==1?"2":index==2?"3":index==3?"4":"1",
        name: index==0?"AI":index==1?"Security":index==2?"Web":index==3?"Mobile":"AI",
      },
      role: "Student",
  }));


// const {addProject} = useProjectStore();
  const handleMemberFieldSearch = (index: number, query: string) => {
    setMemberFieldsSearchQuery(query);
  };

  const handleSubmit = async () => {
    // Here you would typically save the project data
    let response: any = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({
      id: 1,
      icon: "📦",
      title: projectName,
      projectName: projectName,
      projectDescription: projectBrief,
      specification: projectBrief,
      projectField: selectedFields.map((field) => field.name),
      teamSize: teamSize,
      members: selectedMembers.map((member) => ({
        id: member.id,
        name: member.name,
        image: member.image,
        field: member.field?.name || "",
        role: "Student",
      })),
      supervisor: [selectedSupervisor, selectedCoSupervisor].filter(Boolean).map((supervisor) => ({
        id: supervisor?.id || "",
        name: supervisor?.name || "",
        image: supervisor?.image || "",
        field: supervisor?.field || "",
        email: supervisor?.email || "",
        role: "Doctor" as const,
      }))[0],
      projectFiles: [],
      projectRequirements: [],
      description: projectBrief,
    }),
  });
    let data: any = await response.json();
    router.push(`/graduation-project/files?id=${data.id}`);
    console.log(data);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side - Project Details */}
        <div className="space-y-6 bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold">Customize Your Project</h2>

          {/* Project Name */}
          <div className="space-y-2">
            <label className="text-gray-700">Project Name</label>
            <Input
              placeholder="Enter your project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          {/* Brief About Project */}
          <div className="space-y-2">
            <label className="text-gray-700">Brief About Project</label>
            <Textarea
              placeholder="Write a summarized brief about your project"
              value={projectBrief}
              onChange={(e) => setProjectBrief(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          {/* Project Field */}
          <div className="space-y-2">
            <label className="text-gray-700">Project Field</label>
            <div className="relative">
              <Popover
                open={openFieldsPopover}
                onOpenChange={setOpenFieldsPopover}
              >
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-3 py-2 border rounded-md hover:border-gray-400 text-left bg-white"
                  >
                    <span className="text-gray-500">
                      {selectedFields.length > 0
                        ? `${selectedFields.length} field${
                            selectedFields.length > 1 ? "s" : ""
                          } selected`
                        : "Choose your project field"}
                    </span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[--radix-popover-trigger-width] p-0"
                  align="start"
                >
                  <Command className="border-none" shouldFilter={false}>
                    <CommandInput
                      placeholder="Search fields..."
                      className="h-9 border-none focus:ring-0"
                      value={searchQuery}
                      onValueChange={(value) => {
                        setSearchQuery(value);
                      }}
                    />
                    <CommandList>
                      {filteredFields.length === 0 && searchQuery && (
                        <CommandEmpty>No fields found.</CommandEmpty>
                      )}
                      <CommandGroup>
                        {filteredFields.map((field) => {
                          const isSelected = selectedFields.some(
                            (f) => f.id === field.id
                          );
                          return (
                            <div
                              key={field.id}
                              className="px-2 py-1.5 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                if (isSelected) {
                                  handleFieldRemove(field.id);
                                } else {
                                  handleFieldSelect(field);
                                }
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <span>{field.name}</span>
                                {isSelected && (
                                  <svg
                                    className="w-4 h-4 text-[#0A2647]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Selected Fields */}
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedFields.map((field) => (
                <Badge
                  key={field.id}
                  variant="secondary"
                  className="px-3 py-1 bg-[#0A2647] text-white flex items-center gap-1"
                >
                  {field.name}
                  <button
                    type="button"
                    className="hover:text-gray-200 focus:outline-none"
                    onClick={() => handleFieldRemove(field.id)}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Number of team members */}
          <div className="space-y-2">
            <label className="text-gray-700">Number of team members</label>
            <div className="flex gap-2">
              {[3, 4, 5, 6].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleTeamSizeClick(size)}
                  className={`px-4 py-2 rounded-full ${
                    teamSize === size
                      ? "bg-[#0A2647] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Team Members */}
        <div className="space-y-6 bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold">Connect With Members</h2>

          {/* Supervisor */}
          <div className="space-y-2">
            <label className="text-gray-700">Supervisor</label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-3 py-2 border rounded-md hover:border-gray-400 text-left bg-white"
                >
                  {selectedSupervisor ? (
                    <div className="flex items-center space-x-3 w-full justify-between pe-2">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={selectedSupervisor.image}
                            alt={selectedSupervisor.name}
                          />
                          <AvatarFallback>
                            {selectedSupervisor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-[#0A2647] max-sm:text-sm">
                          {selectedSupervisor.name}
                        </div>
                      </div>
                      </div>
                      <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full max-sm:text-xs">
                        {selectedSupervisor.field}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          className={cn(
                            "px-3 py-1 text-sm rounded-md transition-colors bg-green-500 text-white hover:bg-green-600"
                          )}
                        >
                          Requested
                        </button>
                      </div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-500">
                      Choose your Supervisor
                    </span>
                  )}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-2" align="start">
                <div className="space-y-2">
                  {supervisors.map((supervisor) => (
                    <SupervisorOption
                      key={supervisor.id}
                      {...supervisor}
                      isRequested={requestedSupervisors.includes(supervisor.id)}
                      onRequest={() => {
                        setSelectedSupervisor(supervisor);
                        setRequestedSupervisors((prev) => [
                          ...prev,
                          supervisor.id,
                        ]);
                      }}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Co-Supervisor */}
          <div className="space-y-2">
            <label className="text-gray-700">Co-Supervisor</label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-3 py-2 border rounded-md hover:border-gray-400 text-left bg-white"
                >
                  {selectedCoSupervisor ? (
                    <div className="flex items-center space-x-3 justify-between w-full pe-2">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={selectedCoSupervisor.image}
                            alt={selectedCoSupervisor.name}
                          />
                          <AvatarFallback>
                            {selectedCoSupervisor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex gap-5 items-center">
                          <div className="font-medium text-[#0A2647] max-sm:text-sm">
                            {selectedCoSupervisor.name}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full max-sm:text-xs">
                          {selectedCoSupervisor.field}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            className={cn(
                              "px-3 py-1 text-sm rounded-md transition-colors bg-green-500 text-white hover:bg-green-600"
                            )}
                          >
                            Requested
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-500">
                      Choose your Co-Supervisor
                    </span>
                  )}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-2" align="start">
                <div className="space-y-2">
                  {supervisors.map((supervisor) => (
                    <SupervisorOption
                      key={supervisor.id}
                      {...supervisor}
                      isRequested={requestedSupervisors.includes(supervisor.id)}
                      onRequest={() => {
                        setSelectedCoSupervisor(supervisor);
                        setRequestedSupervisors((prev) => [
                          ...prev,
                          supervisor.id,
                        ]);
                      }}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Team Members */}
          <div className="space-y-4">
            {Array.from({ length: teamSize }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button 
                        type="button"
                        className="w-full flex items-center justify-between px-3 py-2 border rounded-md hover:border-gray-400 text-left bg-white"
                      >
                        {selectedMembers[index] ? (
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={selectedMembers[index].image} alt={selectedMembers[index].name} />
                              <AvatarFallback>{selectedMembers[index].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-[#0A2647] max-sm:text-sm">{selectedMembers[index].name}</div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-500">Choose your member</span>
                        )}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-2" align="start">
                      <div className="space-y-2">
                        {members.map((member) => (
                          <MemberOption
                            key={member.id}
                            {...member}
                            isRequested={requestedMembers.includes(member.id)}
                            onRequest={() => {
                              setSelectedMembers(prev => {
                                const newMembers = [...prev];
                                newMembers[index] = member;
                                return newMembers;
                              });
                              setRequestedMembers(prev => [...prev, member.id]);
                              // Open the fields popover after selecting the member
                              setOpenMemberFieldsPopover(prev => ({
                                ...prev,
                                [index]: true
                              }));
                            }}
                          />
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Popover 
                    open={openMemberFieldsPopover[index]} 
                    onOpenChange={(open) => {
                      setOpenMemberFieldsPopover(prev => ({
                        ...prev,
                        [index]: open
                      }));
                    }}
                  >
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="p-2 rounded-md hover:bg-gray-100 text-gray-500 hover:text-[#0A2647] transition-colors"
                        disabled={!selectedMembers[index]}
                      >
                        {selectedMembers[index]?.field ? (
                          <Badge variant="secondary" className="bg-[#0A2647] text-white">
                            {selectedMembers[index].field.name}
                          </Badge>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                            />
                          </svg>
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0" align="end">
                      <Command className="border-none" shouldFilter={false}>
                        <CommandInput
                          placeholder="Search fields..."
                          className="h-9 border-none focus:ring-0"
                          value={memberFieldsSearchQuery}
                          onValueChange={(value) => setMemberFieldsSearchQuery(value)}
                        />
                        <CommandList>
                          {filteredFields.length === 0 && memberFieldsSearchQuery && (
                            <CommandEmpty>No fields found.</CommandEmpty>
                          )}
                          <CommandGroup>
                            {filteredFields.map((field) => {
                              const isSelected = selectedMembers[index]?.field?.id === field.id;
                              return (
                                <div
                                  key={field.id}
                                  className="px-2 py-1.5 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => {
                                    setSelectedMembers(prev => {
                                      const newMembers = [...prev];
                                      if (newMembers[index]) {
                                        newMembers[index] = {
                                          ...newMembers[index],
                                          field: isSelected ? undefined : field
                                        };
                                      }
                                      return newMembers;
                                    });
                                    if (!isSelected) {
                                      setOpenMemberFieldsPopover(prev => ({
                                        ...prev,
                                        [index]: false
                                      }));
                                    }
                                  }}
                                >
                                  <div className="flex items-center justify-between">
                                    <span>{field.name}</span>
                                    {isSelected && (
                                      <svg
                                        className="w-4 h-4 text-[#0A2647]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className=" bg-[#0A2647] text-white py-2 px-4 rounded-md hover:bg-[#0A2647]/90 transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

interface SupervisorOptionProps extends Supervisor {
  isRequested?: boolean;
  onRequest: () => void;
}

const SupervisorOption = ({
  image,
  name,
  field,
  isRequested,
  onRequest,
}: SupervisorOptionProps) => (
  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer max-sm:min-w-[250px] min-w-[555px]">
    <div className="flex items-center space-x-3">
      <Avatar>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium text-[#0A2647] max-sm:text-sm">{name}</div>
        <div className="text-sm text-gray-500 max-sm:text-xs">{field}</div>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={onRequest}
        disabled={isRequested}
        className={cn(
          "px-3 py-1 text-sm rounded-md transition-colors",
          isRequested
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-[#0A2647] text-white hover:bg-[#0A2647]/90"
        )}
      >
        {isRequested ? "Requested" : "Request"}
      </button>
    </div>
  </div>
);

interface MemberOptionProps extends Member {
  isRequested?: boolean;
  onRequest: () => void;
}

const MemberOption = ({
  image,
  name,
  isRequested,
  onRequest,
}: MemberOptionProps) => (
  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer max-sm:min-w-[250px] min-w-[500px]">
    <div className="flex items-center space-x-3">
      <Avatar>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium text-[#0A2647] max-sm:text-sm">{name}</div>
      </div>
    </div>
    <button
      type="button"
      onClick={onRequest}
      disabled={isRequested}
      className={cn(
        "px-3 py-1 text-sm rounded-md transition-colors",
        isRequested
          ? "bg-green-500 text-white hover:bg-green-600"
          : "bg-[#0A2647] text-white hover:bg-[#0A2647]/90"
      )}
    >
      {isRequested ? "Requested" : "Request"}
    </button>
  </div>
);

export default CustomizeProject;
