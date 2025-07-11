CREATE TABLE SCHEDULE (
    ID INT PRIMARY KEY IDENTITY,
    EMP_ID INT NOT NULL,
    SHOP_ID INT NOT NULL,
    START_TIME DATETIME NOT NULL,
    END_TIME DATETIME NOT NULL,
    CREATED_BY NVARCHAR(100),
    NOTES NVARCHAR(MAX)
);

CREATE TABLE TIME_OFF_REQUESTS (
    ID INT PRIMARY KEY IDENTITY,
    EMP_ID INT NOT NULL,
    START_DATE DATE NOT NULL,
    END_DATE DATE NOT NULL,
    REASON NVARCHAR(255),
    STATUS NVARCHAR(50) DEFAULT 'Pending',
    SUBMITTED_AT DATETIME DEFAULT GETDATE()
);

-- Sample data
INSERT INTO MECHANIC (EMPLOYEE_NUMBER, EMPLOYEE_NAME, USERNAME, PASSWORD_HASH, ROLE, ACTIVE)
VALUES
  (1, 'Alice Manager', 'alice', '$2a$10$ho5MKIEA7h8C6PqJ50BXmOSMyjK1XUZ3U6ZkxPNuJiL7p4A8bU15W', 'Manager', 1),
  (2, 'Bob Technician', 'bob', '$2a$10$QHz2GZemkSVVyf9Qu27QGeECeQyHLsJenryBUTMFEhbtl9tiRgpDW', 'Technician', 1);
