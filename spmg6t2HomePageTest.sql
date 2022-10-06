SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `spmg6t2`
--
drop database if exists spmg6t2;
create database spmg6t2;
use spmg6t2;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
    `Role_ID` int(20) NOT NULL,
    `Role_Name` varchar(20) NOT NULL,
    PRIMARY KEY (`Role_ID`)
);

--
-- Dumping data for table `role`
--
INSERT INTO `role` (`Role_ID`,`Role_Name`)
VALUES
(1, 'Admin'),
(2, 'User'),
(3, 'Manager');

-- --------------------------------------------------------
--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
    `Role_ID` int(20) NOT NULL,
    `Role_Name` varchar(20) NOT NULL,
    PRIMARY KEY (`Role_ID`)
);

--
-- Dumping data for table `role`
--
INSERT INTO `role` (`Role_ID`,`Role_Name`)
VALUES
(1, 'Admin'),
(2, 'User'),
(3, 'Manager');

-- --------------------------------------------------------
--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
CREATE TABLE IF NOT EXISTS `staff` (
    `Staff_ID` int NOT NULL,
    `Staff_FName` varchar(50) NOT NULL,
    `Staff_LName` varchar(50) NOT NULL,
    `Dept` varchar(50) NOT NULL,
    `Email` varchar(50) NOT NULL,
    `Role_ID` int NOT NULL,
    PRIMARY KEY (`Staff_ID`),
    FOREIGN KEY (`Role_ID`) REFERENCES role(Role_ID)
);

INSERT INTO  `staff`(`Staff_ID`, `Staff_FName`, `Staff_LName`, `Dept`, `Email`, `Role_ID`)
VALUES 
(1, 'Tom Brady', 'Tan', 'Operations', 'TTB@gmail.com',2),
(2, 'John', 'Low', 'Finance', 'JL@gmail.com', 2),
(3, 'Nicholas', 'Ng', 'Sales', 'NN@gmail.com', 2),
(4, 'Cheryl', 'Ho', 'Human Resource', 'CH@gmail.com', 1),
(5, 'Li Yun', 'Ng', 'Tech', 'LYN@gmail.con', 3);

-- --------------------------------------------------------
--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
CREATE TABLE IF NOT EXISTS `course` (
    `Course_ID` varchar(20) NOT NULL,
    `Course_Name` varchar(50) NOT NULL,
    `Course_Desc` varchar(255),
    `Course_Status` varchar(15),
    `Course_Type` varchar(10),
    `Course_Category` varchar(50),
    PRIMARY KEY (`Course_ID`)
);
--
-- Dumping data for table `course`
--
INSERT INTO `course` (`course_id`,`course_name`,`course_desc`, `course_status`,`course_type`,`course_category`)
VALUES
	('C1','Intro to Interaction Design',
    'In this course learners will use hands-on prototyping to explore virtual and physical body parts, sensory devices, spatial interactions, and wearables. Topics will include cybernetics, Kinesiology, biomechanics, and sensory design.',
    'Active','Internal','Technical'),
	('C2','Applied Financial Analytics',
    'This is a one (1)-year programme (comprising two (2) Post Diploma Certificate PDCs) aimed to equip participants with future-enabled skills to stay relevant in the evolving digital transformation in the banking and finance sector.',
    'Retired','External','Finance'),
    ('C3','Business Risk Assessment',
	'This course teaches how to identify and manage business risks. An effective business risk assessment framework enables organisations to prioritise risks and allocate resources according to their impact and severity.',
    'Active','Internal','Operations Management'),
    ('C4','Retail: Influencer Marketing Management',
    'Carry out social media engagement, advertising and customer experience campaign activities across social media platforms.',
    'Active','Internal','Marketing'),
    ('C5','Python for Data Analysis',
    'Course Content: (1) Data processing with Python (2) Data analysis with Numpy in Python (3) Data analysis with Pandas in Python (4) Data visualization with Matplotlib and Seaborn in Python (5) Machine learning with Scikit-learn in Python',
	'Active','Internal','Technical'),
    ('C6','Investments',
	'This course is an elementary to investments. The objective of this course is to provide and equip you with a solid knowledge and skills in investment and portfolio management.',
    'Active','External','Finance'),
    ('C7','Visual Analytics for Business Intelligence',
	'This course is to learn how to use data visualization and interactive analytic tools and techniques to interact with data of different formats from various sources, explore the expected relationships and discover unexpected correlations and patterns.',
    'Active','External','Technical'),
    ('C8','Introduction to Machine Learning',
	'This course covers both fundamental theory and practical algorithms for machine learning from a variety of perspectives. It includes a range of topics, from supervised learning to unsupervised learning (, and from traditional learning to recent state-of-the-art deep learning methods.',
    'Active','Internal','Technical');

-- --------------------------------------------------------
--
-- Table structure for table `registration`
--

DROP TABLE IF EXISTS `registration`;
CREATE TABLE IF NOT EXISTS `registration`(
    `Reg_ID` int NOT NULL,
    `Course_ID` varchar(20) NOT NULL,
    `Staff_ID` int NOT NULL,
    `Reg_Status` varchar(20) NOT NULL,
    `Completion_Status` varchar(20) NOT NULL,
    PRIMARY KEY (`Reg_ID`),
    FOREIGN KEY (`Course_ID`) REFERENCES Course(`Course_ID`),
    FOREIGN KEY (`Staff_ID`) REFERENCES Staff(`Staff_ID`)
);
--
-- Dumping data for table `registration`
--
INSERT INTO  `registration` (`Reg_ID`, `Course_ID`, `Staff_ID`, `Reg_Status`, `Completion_Status`) VALUES 
(1,'C3',1,'Registered','Not Complete'),
(2,'C6',1,'Waiting','Not Complete'),
(3,'C2',3,'Registered','Completed'),
(4,'C5',3,'Registered','Not Complete'),
(5,'C1',2,'Rejected','Not Complete'),
(6,'C5',2,'Registered',' Complete'),
(7,'C3',2,'Registered','Complete'),
(8,'C6',2,'Waiting','Not Complete'),
(9,'C6',2,'Registered','Complete');

-- --------------------------------------------------------
--
-- Table structure for table `skills`
--


DROP TABLE IF EXISTS `skills`;
CREATE TABLE IF NOT EXISTS `skills` (
    `Skill_ID` int(5) NOT NULL AUTO_INCREMENT,
    `Skill_Name` varchar(50) NOT NULL,
    `Type_of_Skills` varchar(50) NOT NULL,
    `Level_of_Competencies` enum('Beginner','Intermediate','Advanced'),
    `Skill_img` varchar(2083),
    `Skill_Status` enum('Active','Inactive') default 'Active',
    `Course_ID` varchar(20),
  PRIMARY KEY (`Skill_ID`,`Course_ID`),
  FOREIGN KEY (`Course_ID`) REFERENCES course(`Course_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`Skill_ID`, `Skill_Name`, `Type_of_Skills`, `Level_of_Competencies`, `Skill_img`,`Skill_Status`,`Course_ID`) VALUES
(00001, 'Data Analytics','Technical','Beginner','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dgvaishnavcollege.edu.in%2Fdummy-profile-pic%2F&psig=AOvVaw08g7CCVOO4ZqEMCs5VEuNK&ust=1664700123877000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKCE5K7RvvoCFQAAAAAdAAAAABAD','Active','C2'),
(00001, 'Data Analytics','Technical','Beginner','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dgvaishnavcollege.edu.in%2Fdummy-profile-pic%2F&psig=AOvVaw08g7CCVOO4ZqEMCs5VEuNK&ust=1664700123877000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKCE5K7RvvoCFQAAAAAdAAAAABAD','Active','C5'),
(00002, 'Enterprise Risk Management','Technical','Intermediate','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dgvaishnavcollege.edu.in%2Fdummy-profile-pic%2F&psig=AOvVaw08g7CCVOO4ZqEMCs5VEuNK&ust=1664700123877000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKCE5K7RvvoCFQAAAAAdAAAAABAD','Active','C3'),
(00003, 'Interaction Design','Technical','Beginner','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dgvaishnavcollege.edu.in%2Fdummy-profile-pic%2F&psig=AOvVaw08g7CCVOO4ZqEMCs5VEuNK&ust=1664700123877000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKCE5K7RvvoCFQAAAAAdAAAAABAD','Active','C1'),
(00004, 'Finance','Technical','Advanced','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dgvaishnavcollege.edu.in%2Fdummy-profile-pic%2F&psig=AOvVaw08g7CCVOO4ZqEMCs5VEuNK&ust=1664700123877000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKCE5K7RvvoCFQAAAAAdAAAAABAD','Active','C6'),
(00005, 'Marketing and Sales','Soft','Beginner','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dgvaishnavcollege.edu.in%2Fdummy-profile-pic%2F&psig=AOvVaw08g7CCVOO4ZqEMCs5VEuNK&ust=1664700123877000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKCE5K7RvvoCFQAAAAAdAAAAABAD','InActive','C4'),
(00001, 'Data Analytics','Technical','Beginner','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dgvaishnavcollege.edu.in%2Fdummy-profile-pic%2F&psig=AOvVaw08g7CCVOO4ZqEMCs5VEuNK&ust=1664700123877000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKCE5K7RvvoCFQAAAAAdAAAAABAD','Active','C7'),
(00001, 'Data Analytics','Technical','Beginner','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dgvaishnavcollege.edu.in%2Fdummy-profile-pic%2F&psig=AOvVaw08g7CCVOO4ZqEMCs5VEuNK&ust=1664700123877000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKCE5K7RvvoCFQAAAAAdAAAAABAD','Active','C8'),
(00005, 'Marketing and Sales','Soft','Beginner','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dgvaishnavcollege.edu.in%2Fdummy-profile-pic%2F&psig=AOvVaw08g7CCVOO4ZqEMCs5VEuNK&ust=1664700123877000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKCE5K7RvvoCFQAAAAAdAAAAABAD','Active','C6');


-- --------------------------------------------------------
--
-- Table structure for table `ljroles`
--



DROP TABLE IF EXISTS `ljroles`;
CREATE TABLE IF NOT EXISTS `ljroles` (
    `LJRole_ID` int(5) NOT NULL AUTO_INCREMENT,
    `LJRole_Name` varchar(50) NOT NULL,
    `LJRole_Description` varchar(225),
    `Department` varchar(50) NOT NULL,
    `Key_Task` varchar(225),
    `LJRole_Status` enum('Active','Inactive') default 'Active',
    `LJRole_img` varchar(2083),
    `Skill_ID` int(5) NOT NULL,
  PRIMARY KEY (`ljrole_id`,`Skill_ID`),
  FOREIGN KEY (`Skill_ID`) REFERENCES skills(`Skill_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ljroles`
--

INSERT INTO `ljroles` (`LJRole_ID`, `LJRole_Name`, `LJRole_Description`, `Department`, `Key_Task`,`LJRole_Status`,`LJRole_img`,`Skill_ID`) VALUES
(00001, 'Regional Data Analyst', 'The Data Analyst partners with Regional Operations teams to provide analytical support to help the team achieve objectives.The Data Analyst masters both the data and business domains to play a key role in decision-making','Operation','1) Sourcing and analysing new data sources. 2)Provide actionable recommendations based on data insights to drive business outcomes. 3)Create reports and visualisation tools (dashboards) to facilitate understanding of data','Active','https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg',00001),
(00002, 'Business Intelligence Analyst','The Business Intelligence Analyst will gather, analyze, and compile data needed to identify trends and patterns, then make recommendations for business actions.','Operation','1) Assesses market strategies by analysing related products, markets, or trends. 2) Identifies markets for future product development and methods to improve sales of existing products by analysing technology trends.','InActive','https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg',00001),
(00002, 'Business Intelligence Analyst','The Business Intelligence Analyst will gather, analyze, and compile data needed to identify trends and patterns, then make recommendations for business actions.','Operation','1) Assesses market strategies by analysing related products, markets, or trends. 2) Identifies markets for future product development and methods to improve sales of existing products by analysing technology trends.','InActive','https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg',00002),
(00002, 'Business Intelligence Analyst','The Business Intelligence Analyst will gather, analyze, and compile data needed to identify trends and patterns, then make recommendations for business actions.','Operation','1) Assesses market strategies by analysing related products, markets, or trends. 2) Identifies markets for future product development and methods to improve sales of existing products by analysing technology trends.','InActive','https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg',00004),
(00003, 'Operation Manager','An Operations Manager oversees company organisational processes and adds improvements. Duties include hiring, training, implementing policies, strategies to improve productivity and building an enjoyable company culture.','Operation','1) Make important policy, planning, and strategy decisions. 2) Develop, implement, and review operational policies and procedures. 3)Work with the board of directors to plan for short and long-term goals','Active','https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg',00002),
(00004, 'UIUX Developer','Hiring a passionate, user centred UIUX Designer to join a collaborative and innovative team to create visually delightful and easy-to-use digital products. A highly collaborative work with product managers and engineers.','Technology', '1) Create user-centred designs by understanding business requirements and user feedback 2)Create user flows, wireframes, prototypes, mockups 3) Incorporate customer feedback, usage metrics, and usability findings into design','Active','https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg',00003),
(00005, 'Finance Officer','Finance Officer involves providing financial and administrative support to colleagues, clients and stakeholders of the business. It’s a role that may attract applicants keen to move up the financial corporate ladder','Finance','1) Assist in the preparation of budgets. 2) Manage records and receipts. 3) Reconcile daily, monthly and yearly transactions 4) Prepare balance sheets 4) Point of contact for other dept on financial and accounting issues','Active','https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg',00004),
(00006, 'Sales Executive','Responsible for helping build up a business by identifying new business prospects and selling products to them. They must maintain relationships with current clients and build and maintain relationships with new clients.','Sales','1) Research and recommend prospects for new business opportunities. 2)Research and analyse sales options. 3)Build and maintain relationships with clients and prospects. 4) Build and maintain professional networks','Active','https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg',00004),
(00006, 'Sales Executive','Responsible for helping build up a business by identifying new business prospects and selling products to them. They must maintain relationships with current clients and build and maintain relationships with new clients.','Sales','1) Research and recommend prospects for new business opportunities. 2)Research and analyse sales options. 3)Build and maintain relationships with clients and prospects. 4) Build and maintain professional networks','Active','https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg',00005);


-- --------------------------------------------------------
--
-- Table structure for table `learning_journey`
--


DROP TABLE IF EXISTS `learning_journey`;
CREATE TABLE IF NOT EXISTS `learning_journey` (
    `LJ_ID` int(5) NOT NULL AUTO_INCREMENT,
    `Staff_ID` int NOT NULL,
    `SubmittedLJRole_ID` int NOT NULL,
    `Submitted_Skill_ID`int(5) NOT NULL,
    `Submitted_CourseID` varchar(20) NOT NULL,
    PRIMARY KEY (`LJ_ID`,`Submitted_Skill_ID`,`Submitted_CourseID`),
    FOREIGN KEY (`Staff_ID`) REFERENCES staff(`Staff_ID`),
    FOREIGN KEY (`Submitted_CourseID`) REFERENCES course(`Course_ID`),
    FOREIGN KEY (`SubmittedLJRole_ID`) REFERENCES ljroles(`LJRole_ID`),
    FOREIGN KEY (`Submitted_Skill_ID`) REFERENCES skills(`Skill_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `learning_journey`
--
INSERT INTO  `learning_journey` (`LJ_ID`, `Staff_ID`,  `SubmittedLJRole_ID`,`Submitted_Skill_ID`,`Submitted_CourseID`) VALUES 
(00001,1,00003,00002,'C3'),
(00002,3,00001,00001,'C2'),
(00002,3, 00001,00001,'C5'),
(00004,1,00005,00004,'C6'),
(00005,2,00004,00003,'C1'),
(00006,2,00002,00001,'C5'),
(00006,2,00002,00002,'C3'),
(00006,2,00002,00004,'C6'),
(00006,2,00002,00005,'C6');

COMMIT;