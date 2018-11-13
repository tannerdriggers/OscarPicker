USE [OscarPicker]
GO

/****** Object:  Table [dbo].[OscarCategory]    Script Date: 11/11/2018 9:45:26 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[OscarCategory](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[Description] [nvarchar](450) NULL,
	[IsActive] [bit] NOT NULL,
	[Type] [int] NOT NULL,
 CONSTRAINT [PK_OscarCategory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [Name] UNIQUE NONCLUSTERED 
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[OscarCategory] ADD  CONSTRAINT [DF_OscarCategory_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

CREATE TABLE [dbo].[OscarRecipient](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[Type] [int] NOT NULL,
	[Description] [nvarchar](450) NULL,
	[OscarCategoryId] [bigint] NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_OscarRecipient] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[OscarRecipient] ADD  CONSTRAINT [DF_OscarRecipient_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[OscarRecipient]  WITH CHECK ADD  CONSTRAINT [FK_OscarRecipient_OscarCategory_OscarCategoryId] FOREIGN KEY([OscarCategoryId])
REFERENCES [dbo].[OscarCategory] ([Id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[OscarRecipient] CHECK CONSTRAINT [FK_OscarRecipient_OscarCategory_OscarCategoryId]
GO

create table [dbo].OscarRecipientCategory (
	Id bigint not null Primary Key Identity(1,1),
	RecipientId bigint not null,
	CategoryId bigint not null,

	foreign key (RecipientId)
		references [dbo].OscarRecipient(Id),
	foreign key (CategoryId)
		references [dbo].OscarCategory(Id),

	unique(RecipientId, CategoryId)
)

GO

create table [dbo].UserChoice (
	Id bigint not null identity(1,1),
	user_id bigint not null,
	OscarRecipientCategoryId bigint not null,
	IsActive bit not null DEFAULT(1),

	foreign key (OscarRecipientCategoryId) 
		REFERENCES [dbo].OscarRecipientCategory(Id),

	primary key(Id)
)
