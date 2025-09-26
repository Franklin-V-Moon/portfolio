import { ColumnData, Proficiency, FolioData } from "../folio/types";

const { Learning, Capable, Proficient, HighlyProficient } = Proficiency;

const Description = {
	Learning:
		"Want to learn for career development. I've never worked with it professionally and knowledge is theoretical only. But I am interested in this and want to prove myself.",
	Capable:
		"Practiced some. Knowledge is practical and I have played around a little but haven’t gone into significant depth yet.",
	Proficient:
		"I've worked with it, I've gone into depth, and I'm comfortable guiding others. I can pair with other developers and influence at my peer level and with folks I'm guiding.",
	HighlyProficient:
		"Can lead pairing on a project no matter who the pair is. Very comfortable with the language/tool and can teach others at different skill levels and in different project situations.",
};

export const languagesMetaData: ColumnData[] = [
	{
		title: "Frontend",
		knowledge:
			"Building user interfaces that sing, seamlessly merging modern design trends with rock-solid accessibility practices and clean, well-tested code in both Web and mobile applications for Android/iOS",
		proficiency: Proficient,
		description: Description.Proficient,
		data: [
			{
				title: "Typescript",
				knowledge:
					"I have used Typescript in various projects, including web applications and mobile apps, and have found that it helps me catch errors early on in the development process, saving time spent on debugging and testing. Additionally, Typescript's type system allows me to write more modular and reusable code, increasing my efficiency and effectiveness.",
				proficiency: HighlyProficient,
				description: Description.HighlyProficient,
			},
			{
				title: "Javascript",
				knowledge:
					"I have a thorough understanding of the language and am proficient in using it effectively. My expertise in the syntax, modern concepts, and commonly used tools and frameworks of JavaScript is strong. I keep up-to-date with the latest developments in the language and have a genuine interest in its evolution.",
				proficiency: HighlyProficient,
				description: Description.HighlyProficient,
			},
			{
				title: "React",
				knowledge:
					"I have a strong understanding of the framework and am proficient in using its features to build efficient and effective user interfaces. I am adept at troubleshooting and debugging issues that may arise while working with React and can adapt quickly to new features and updates to the framework.",
				proficiency: HighlyProficient,
				description: Description.HighlyProficient,
			},
			{
				title: "React Native",
				knowledge:
					"I am proficient in using the features of React Native to build high-quality, performant mobile applications. I am confident in my ability to troubleshoot issues and find solutions when working with React Native and have a good understanding of best practices and design patterns for building applications, which I can apply to my projects.",
				proficiency: HighlyProficient,
				description: Description.HighlyProficient,
			},
			{
				title: "Jest",
				knowledge:
					"I am effective at using Jest to write and run tests for various back and frontend applications. I am familiar with the various assertion methods and test utilities that Jest provides, and am able to troubleshoot and debug any issues that may arise during testing.",
				proficiency: HighlyProficient,
				description: Description.HighlyProficient,
			},
			{
				title: "NextJS",
				knowledge:
					"I have a strong understanding of Vercel's NextJS features like server-side rendering and code splitting. I am proficient in applying these features in various projects and am confident in my ability to use NextJS to build high-quality applications. I am also capable of troubleshooting any issues that may arise.",
				proficiency: HighlyProficient,
				description: Description.HighlyProficient,
			},
			{
				title: "Redux",
				knowledge:
					"I have used React Redux and have a solid understanding of its ability to manage complex state in a scalable and maintainable way. It allows for clear separation of concerns, making it easier to understand and update the codebase. Additionally, it provides a predictable way to update the application's state, which helps to minimize potential bugs. However, there are also some drawbacks to using React Redux, such as added complexity.",
				proficiency: HighlyProficient,
				description: Description.Proficient,
			},
			{
				title: "Flask",
				knowledge:
					"I can confidently say that I am very familiar with it and use it regularly in my projects. I have a strong understanding of its features and capabilities, and am able to effectively apply them to build web applications. In my experience, Python Flask has proven to be a valuable tool for building web applications quickly and efficiently. Its simplicity and flexibility make it an excellent choice for a wide range of projects.",
				proficiency: HighlyProficient,
				description: Description.HighlyProficient,
			},
			{
				title: "CSS/SASS",
				knowledge:
					"I have used CSS in numerous projects in the past and have found it to be an invaluable tool for styling and formatting the front-end of web applications. I appreciate the flexibility and control that CSS gives me as a developer, and I am confident in my ability to use it effectively to create visually appealing and user-friendly interfaces.",
				proficiency: HighlyProficient,
				description: Description.HighlyProficient,
			},
			{
				title: "HTML",
				knowledge:
					"In my experience, HTML has proven to be a core reliable and essential part of any web developers career. It allows me to create well-structured and visually appealing web pages, and I am comfortable using it to implement a wide range of design elements in various methods.",
				proficiency: HighlyProficient,
				description: Description.HighlyProficient,
			},
		],
	},
	{
		title: "Backend",
		knowledge:
			"Experienced building robust API's, micro-services and serverless backends that are highly tested and lightweight ensuring modern practices are adhered to. Also experienced working in and refactoring legacy monoliths.",
		proficiency: Proficient,
		description: Description.Proficient,
		data: [
			{
				title: "C#",
				knowledge:
					"C sharp is a modern and object-oriented language, which means it is well-suited for building robust and scalable backend systems. This can be particularly useful as I am interested in becoming a backend and infrastructure expert.",
				proficiency: Proficient,
				description: Description.Capable,
			},
			{
				title: "ASP .NET Core",
				knowledge:
					"I'm excited to be prioritizing dotNET as my next major learning goal.",
				proficiency: Proficient,
				description: Description.Capable,
			},
			{
				title: "XUnit",
				knowledge:
					"To compliment my learning of dotNET, I must ensure I'm writing maintainable reliable C# code with XUnit unit tests.",
				proficiency: Capable,
				description: Description.Capable,
			},
			{
				title: "Node",
				knowledge:
					"I have consistently utilized NodeJS in my professional capacity, and have gained a thorough understanding of its strengths and limitations. NodeJS boasts a high capacity for handling multiple concurrent connections and is known for its efficiency and lightweight design. It is particularly well-suited for developing real-time web applications. However, it should be noted that NodeJS operates on a single thread, which can potentially present certain challenges.",
				proficiency: HighlyProficient,
				description: Description.HighlyProficient,
			},
			{
				title: "GraphQL",
				knowledge:
					"I've worked with GraphQL on various projects and am familiar with its benefits and drawbacks. For example, some benefits include the ability to request specific data from an API, usage of a single endpoint for all data queries, and the ability to easily update and evolve the API. Drawbacks include the need for a GraphQL server, the learning curve for developers who are new to the technology, and the potential for performance issues if not implemented correctly.",
				proficiency: Proficient,
				description: Description.Proficient,
			},

			{
				title: "ExpressJS",
				knowledge:
					"I find it to be a valuable tool in my work. I use it regularly in my projects and have a strong understanding of its features and capabilities. ExpressJS is a lightweight, flexible framework that makes it easy to build web applications and APIs. It provides a wide range of features and middleware that can be easily customized and integrated into any project. I appreciate the simplicity and power of ExpressJS, and find it to be an essential part of my toolkit as a developer.",
				proficiency: Capable,
				description: Description.Capable,
			},
			{
				title: "PyTest",
				knowledge:
					" I find it to be a valuable tool for testing my code. PyTest makes it easy to write and execute tests, and the ability to run tests in parallel helps to speed up the testing process. In addition, the rich set of features offered by PyTest, such as fixture support and the ability to customize test discovery, make it a flexible and powerful testing framework.",
				proficiency: HighlyProficient,
				description: Description.HighlyProficient,
			},
			{
				title: "Selenium",
				knowledge:
					"I have found it to be a valuable tool for automating web browser tasks. It allows me to easily write scripts that can interact with websites and perform tasks such as filling out forms, clicking buttons, and navigating pages. This can save a lot of time and effort, especially when it comes to tasks that need to be repeated frequently or on a large scale.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
			{
				title: "RapidAPI",
				knowledge:
					"I have found it to be a valuable tool in my work. It allows me to easily access and integrate a wide range of APIs into my projects, saving me time and effort in the development process. I have used Python RapidAPI to connect to a variety of APIs and have found it to be easy to use and reliable. I appreciate the convenience and efficiency that it provides, and believe it is a valuable resource for any developer working with APIs.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
			{
				title: "Unittest",
				knowledge:
					"Using Python Unittest has helped me to write more robust and reliable code. It gives me confidence that my code is working as intended and allows me to catch and fix issues before they become more significant problems.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
		],
	},
	{
		title: "DevOps",
		knowledge:
			"Eager to stay ahead of the curve in cloud computing, working on some of the latest design paradigms like dockerization and serverless with a focus on availability and reliability across regions and availability zones.",
		proficiency: Capable,
		description: Description.Proficient,
		data: [
			{
				title: "Kubernetes",
				knowledge:
					"I'm comfortable using Kubernetes, configuring clusters using kubectl and deploying containerized applications across multiple environments for efficient scaling and resource management in various platforms including Minikube, k3ds, EKS and even EC2",
				proficiency: Capable,
				description: Description.Proficient,
			},
			{
				title: "Dockerization",
				knowledge:
					"Docker allows for easy containerization of applications, which makes it easier to deploy and run applications in different environments. I have used Docker in a variety of projects, including deploying and scaling web applications and microservices.",
				proficiency: Proficient,
				description: Description.HighlyProficient,
			},
			{
				title: "Python",
				knowledge:
					"I use Python to write scripts for automation, data processing, web development and other tasks that require quick and efficient execution. My favorite aspect of Python is the integration of hardware and software components that allow for physical inventions, automated tooling and robots.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
			{
				title: "Terraform",
				knowledge:
					"Its declarative configuration language makes it easy to understand and maintain infrastructure as code, which helps to improve the reliability and repeatability of my deployments. Overall, I have found Terraform to be an invaluable tool in my work as a developer and believe it can be a valuable asset for any organization.",
				proficiency: Capable,
				description: Description.HighlyProficient,
			},
			{
				title: "Backstage IDP",
				knowledge:
					"Backstage IDP is an open-source developer portal framework that centralizes tools, services, and documentation to streamline developer workflows and improve platform discoverability. I have a strong understanding developing for Backstage and its extensibility, particularly how it can be leveraged to address challenges around developer onboarding, service cataloging, and consistent self-service workflows across distributed teams.",
				proficiency: Proficient,
				description: Description.HighlyProficient,
			},
			{
				title: "Action Runners",
				knowledge:
					"I've experience setting up and maintaining action runners across different contexts including Github Actions to self hosted runners operating on AWS EKS with and without Auto-mode.",
				proficiency: Capable,
				description: Description.Proficient,
			},
			{
				title: "Datadog",
				knowledge:
					"Datadog is a cloud-based monitoring and observability platform that aggregates logs, metrics, and traces from distributed systems into a unified view. I’m comfortable configuring it to ingest data from various sources and have experience building dashboards that provide actionable insights for performance and reliability.",
				proficiency: Capable,
				description: Description.Capable,
			},
			{
				title: "Helm",
				knowledge:
					"Helm is a package manager for Kubernetes that simplifies deployment by packaging manifests into reusable charts, enabling consistent, version-controlled infrastructure as code. I’ve used it both to rapidly scale resources in EKS clusters and to develop custom charts that ensure reliable, repeatable application deployments.",
				proficiency: Capable,
				description: Description.Proficient,
			},
			{
				title: "Action Runners",
				knowledge:
					"I've experience setting up and maintaining action runners across different contexts including Github Actions to self hosted runners operating on AWS EKS with and without Auto-mode.",
				proficiency: Capable,
				description: Description.Proficient,
			},
			{
				title: "Bash / Shell",
				knowledge:
					"BASH/Shell allows me to automate tasks and perform actions quickly and efficiently on the command line. I have used it to manage and manipulate files and directories, run scripts, and execute commands on remote servers.",
				proficiency: Capable,
				description: Description.Capable,
			},
		],
	},
	{
		title: "Misc.",
		knowledge:
			"Various languages that I'm fully capable of working in. I understand them well and have significant real world world experience with each of them.",
		proficiency: Proficient,
		description: Description.Proficient,
		data: [
			{
				title: "SEO",
				knowledge:
					"Search Engine Optimization is more than just keywords and HTML tags, its a full time role involving connecting identities, patterns and brands into a unified data piece navigable by robots. I have solid experience building, expanding and fixing SEO but also branding and exposure as they're often one and the same.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
			{
				title: "JIRA",
				knowledge:
					"The Jira REST API provides programmatic access to issues, workflows, and projects, enabling seamless automation and integration with external systems. I’m proficient at leveraging it to connect Jira with tools like GitHub, Backstage, AWS, and Microsoft Teams, creating tightly integrated workflows that streamline development and reduce manual overhead.",
				proficiency: Capable,
				description: Description.Capable,
			},
			{
				title: "Git",
				knowledge:
					"Git allows for version control of code, which means I can track changes made to my code over time and easily revert back to previous versions if necessary. It also makes it easy to collaborate with other developers by allowing us to work on the same codebase without overwriting each other's changes. Overall, I find Git to be an invaluable tool for any developer, as it helps to streamline the development process and make it more efficient and effective.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
			{
				title: "SQL",
				knowledge:
					"I have used SQL to write queries to extract, manipulate, and analyze data, and you have gained a good understanding of its syntax and capabilities. ",
				proficiency: Capable,
				description: Description.Capable,
			},
			{
				title: "Unity",
				knowledge:
					"After I feel confident with C# and dotNET I hope to explore game development with Unity.",
				proficiency: Learning,
				description: Description.Learning,
			},
			{
				title: "USS",
				knowledge:
					"Along with unity I have a strong understanding of the UI Toolkit and have used it to build scalable extensible user interfaces",
				proficiency: HighlyProficient,
				description: Description.HighlyProficient,
			},
			{
				title: "UXML",
				knowledge:
					"Along with unity I have a strong understanding of the UI Toolkit and have used UXMLto build scalable extensible user interfaces ",
				proficiency: Proficient,
				description: Description.Proficient,
			},
			{
				title: "JQuery",
				knowledge:
					"I've Jquery on various legacy applications and understand it's valuable tool for manipulating the DOM and adding interactivity to my web applications. However, it is important to consider the drawbacks of using Jquery, it can add a significant amount of weight to a page if many Jquery plugins are used, and it is not as performant as some newer JavaScript libraries and frameworks.",
				proficiency: Capable,
				description: Description.Capable,
			},
		],
	},
];

export const toolsMetaData: FolioData[] = [
	{
		title: "Dev",
		data: [
			{
				title: "Ubuntu",
				knowledge:
					"Daily experience using Linux-based operating systems for both personal use (Editing, gaming, daily productivity) and professional use (Servers, testing pipelines etc).",
				proficiency: HighlyProficient,
				description: Description.HighlyProficient,
			},
			{
				title: "Figma",
				knowledge:
					"Figma is a collaborative design tool for prototyping and designing user interfaces.  I've used it to generate various projects for analysis and also regularly use it for work when I assist Experience Designers with prototyping.",
				proficiency: HighlyProficient,
				description: Description.HighlyProficient,
			},
			{
				title: "Postman",
				knowledge:
					"API platforms are tools that allows developers to test and debug APIs but many have not delved deeper into environment configuration, sharing and packaging like I have.",
				proficiency: HighlyProficient,
				description: Description.HighlyProficient,
			},
			{
				title: "Github",
				knowledge:
					"I have used Github to host my own personal projects as well as contribute to open source projects. It's a core tool all devs need to know these days and im comfortable with it",
				proficiency: HighlyProficient,
				description: Description.HighlyProficient,
			},
		],
	},
	{
		title: "Design",
		data: [
			{
				title: "Davinci Resolve",
				knowledge:
					"Davinci Resolve is a post-production tool that allows users to edit, color correct, and finish video projects. I regularly work on various projects involving music videos and documentaries which require a deep knowledge of the software.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
			{
				title: "Blender",
				knowledge:
					"Blender is a 3D graphics software that is used for creating and manipulating 3D models, animations, and visual effects in post-production. I've used it for over a decade now to add an extra 'spice' to my video projects and to 3D print.",
				proficiency: Capable,
				description: Description.Capable,
			},
			{
				title: "Photoshop / Affinity Photo ",
				knowledge:
					"Photoshop and Affinity Photo are graphics editing software that allows users to manipulate and enhance images and graphics. I've used it for over a decade to correct color, remove noise and to create various imagery, much of which you can see on this site.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
			{
				title: "After Effects",
				knowledge:
					"Adobe After Effects is a tool for creating and editing motion graphics and visual effects for video and film. I primarily use it to add moving typography and for transitions but have also completed entire animations in 2D and 3D space.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
			{
				title: "InDesign",
				knowledge:
					"Adobe InDesign is a tool used for creating and designing professional documents such as brochures. I've used it as a volunteer to generate various reports, newsletters and magazines. ",
				proficiency: HighlyProficient,
				description: Description.HighlyProficient,
			},
			{
				title: "Illustrator",
				knowledge:
					"Adobe Illustrator is a vector graphics editor used for creating and editing digital graphics and designs. Similar to photoshop, I've used it to generate stills and even motion graphic sprites of various needs, often for websites by taking advantage of the power of SVGs.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
			{
				title: "Premiere",
				knowledge:
					"Adobe Premiere is a video editing software that allows users to create and edit professional-quality video projects. I regularly work on various projects involving music videos and documentaries which require a deep knowledge of the software.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
			{
				title: "XD",
				knowledge:
					"Adobe XD is a design and prototyping tool used to create user interfaces and user experiences for websites and mobile applications. I've used it to generate various projects for analysis and also regularly use it for work when I assist Experience Designers with prototyping.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
		],
	},
	{
		title: "Other",
		data: [
			{
				title: "Google Search Console",
				knowledge:
					"Google Search Console is a web service that provides insights into how Google indexes and ranks your site, offering tools to monitor performance, identify technical issues, and optimize visibility in search results. I’m confident in leveraging it to diagnose SEO challenges, refine keyword strategies, and ensure content is consistently aligned with best practices for discoverability.",
				proficiency: HighlyProficient,
				description: Description.HighlyProficient,
			},
			{
				title: "Apple Developer",
				knowledge:
					"Apple Developer is a suite of tools and resources provided by Apple for developing and distributing software for the company's platforms, including iOS, iPadOS, macOS, watchOS, and tvOS. used alongside Android App Distribution where I've worked on projects where it was an integral part of the release process and required me to understand how it functioned, how to use the provided indicators and also how to debug.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
			{
				title: "Heroku",
				knowledge:
					"Heroku is a cloud platform that enables developers to build, run, and operate applications entirely in the cloud. I've used it to deploy various backends and micro services as it's super simple to get started with and reliable.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
			{
				title: "Vercel",
				knowledge:
					"Vercel is a cloud platform for hosting websites and web applications, allowing developers to deploy their projects with a global network of edge servers for low latency and high performance. I have used it to deploy this very site as it meshes well with NextJS, also maintained by Vercel",
				proficiency: Capable,
				description: Description.Capable,
			},
		],
	},
];

export const cloudMetaData: FolioData[] = [
	{
		title: "Amazon AWS",
		data: [
			{
				title: "EKS",
				knowledge:
					"I'm comfortable setting up and interfacing with AWS Elastic Kubernetes Service both self managed and auto-mode, including provisioning clusters, deploying containerized applications with Kubernetes manifests, and managing deployments and scaling using kubectl.",
				proficiency: Capable,
				description: Description.Proficient,
			},
			{
				title: "EC2",
				knowledge:
					"My experience with EC2 covers all the essentials, from provisioning resources in diverse instance types and regions, to implementing auto-scaling for dynamic workloads, and configuring autoscaling groups for high availability.",
				proficiency: Capable,
				description: Description.HighlyProficient,
			},
			{
				title: "ECR",
				knowledge:
					"From crafting secure repositories to streamlining image management and automating deployments, I'm confident navigating the full spectrum of AWS ECR tasks",
				proficiency: Capable,
				description: Description.Capable,
			},
			{
				title: "Route53",
				knowledge:
					"I'm confident using Route53 for domain registration, managing hosted zones, configuring record types and implementing health checks for higher availability.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
			{
				title: "Lambda",
				knowledge:
					"I've used lambda functions to solve a range or challenges including for small repetitive pipeline build tasks all the way to using it as an entire backend to avoid cold starts for infrequently used webapps.",
				proficiency: Proficient,
				description: Description.Capable,
			},
			{
				title: "CloudFront",
				knowledge:
					"I have a solid understanding of what Cloudfront is capable of and how to best utilise its features. Primarily used it as a front end for APIs and video streaming services",
				proficiency: Proficient,
				description: Description.Proficient,
			},
			{
				title: "Transcribe",
				knowledge:
					"I'm highly proficient with AWS Transcribe, leveraging it programmatically to convert large volumes of audio into accurate, structured text and integrating it into automated pipelines for real-time and batch transcription use cases.",
				proficiency: HighlyProficient,
				description: Description.HighlyProficient,
			},
			{
				title: "RDS & DynamoDB",
				knowledge:
					"I'm proficient with AWS RDS and DynamoDB, setting up and maintaining databases with various budget concerns, handling automated backups and read replicas, and tuning performance for scalability and high availability across multiple environments, keeping track of costs.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
		],
	},
	{
		title: "Google Cloud",
		data: [
			{
				title: "Firebase",
				knowledge:
					"Google Firebase is a platform that provides a variety of tools and services for building mobile and web applications, including a real-time database, user authentication, hosting, and analytics. I've used it to push data to client devices instead of using sockets and intend to keep learning it as it's an awesome solution for backend problems.",
				proficiency: Learning,
				description: Description.Learning,
			},
			{
				title: "Android App Distribution",
				knowledge:
					"Android App Distribution is a process by which Android apps are made available for users to download and install on their devices via the google play store. I've worked on projects where it was an integral part of the release process and required me to understand how it functioned, how to use the provided indicators and also how to debug.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
		],
	},
	{
		title: "CI/CD",
		data: [
			{
				title: "ArgoCD",
				knowledge:
					"Using ArgoCD to deploy manifests to various types of kubernetes clusters. Includes configuring the platform via HELMs and managing secrets upfront. I can use various debugging tools within ArgoCD to effectively diagnose issues in a cluster.",
				proficiency: Capable,
				description: Description.Proficient,
			},
			{
				title: "CircleCI",
				knowledge:
					"CircleCI is a continuous integration and delivery platform that helps development teams build, test, and deploy their code rapidly and reliably. I've used it on multiple projects to handle testing requirements and is an excellent tool to create visibility of code status.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
			{
				title: "GoCD",
				knowledge:
					"GoCD is a continuous delivery platform that helps organizations automate and track the build, test, and release process for their software projects, enabling them to deliver high-quality software faster and more reliably. I've used it on multiple projects to handle testing requirements and is an excellent tool to create visibility of code status.",
				proficiency: Capable,
				description: Description.Capable,
			},
			{
				title: "Buildkite",
				knowledge:
					"Buldkite is a tool for continuous integration and continuous delivery that allows users to build, test, and deploy their software projects automatically, ensuring that their code is always up to date and in a deployable state. I've used it on multiple projects to handle testing requirements and is an excellent tool to create visibility of code status.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
			{
				title: "Travis CI",
				knowledge:
					"Travis CI is a continuous integration tool that allows developers to automatically build, test, and deploy their software projects, typically as part of a larger development workflow. I've used it on multiple projects to handle testing requirements and is an excellent tool to create visibility of code status.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
			{
				title: "Github Actions",
				knowledge:
					"GitHub Actions is a tool that allows users to automate processes and workflows within a GitHub repository, such as building and deploying code, running tests, and integrating with external services. I often use this to easily deploy smaller projects and ones where using less services are a priority.",
				proficiency: Proficient,
				description: Description.Proficient,
			},
		],
	},
];
