# KMS Editor

![logo](/logo.png)

The KMS Editor is part of a larger Knowledge Management Solution.  The Markdown editor has been split out from the rest of the Visual Studio Code tools so that it can be used with the VS Code Web tools 

# Version 2.0
Updated for Atlassian Support


# Version 1.6.0
With the release of the latest VSCode, a breaking change was found when inserting Front Matter

# Version 1.5.0
Added new Support for Requirement Sizing and Quickbase integration
kmscore.syncrhonizeQB
# Version 1.3.0

## Map Support

Inject a map template using from one of many maps in the /settings/maptemplates folder.  Add new templates to this folder to add your own

## Markdown Tools

### Added new Front Matter Support

When inserting front matter, the following prompts will be displayed to the user

 - Topic Title - *Set the Title of the Document* 
 - Topic Type:

|Type|Used For|
|:--|---|
|Reference|Used for topics indented for help and marketing publications|
|Requirement|used for requirement publications.  In order to calculate the feature reuse percentages, you must use a Requirement Topic|
|Notes|Meeting notes|

 - Components: *Content Areas*
 - Target: *Sprint to Target*
 - Tags: *Topic Tags to Add. Tags are stored in the /settings/tags.json file* 

### User Story Support

- Inserting a new story will prompt for the Story title and then provide an Actor selection  
- list.  Actors are stored in /settings/actors.json file
### Insert Figure Support

 - Image Sizes are now in a selection box
 - Now creates an image place holder at the requested size

### Insert Jira Items

Using the Publish tools, Documentation and Jira issues can not be syncronized with the Atlassian solution


## New Application Settings:

|Setting|Description|
|:--|:--|
|KMS.CONFLUENCE.Token|User Token used to Communicate with Confluence|
|KMS.CONFLUENCE.Domain|User Token used to Communicate with Confluence|
|KMS.JIRA.Token|User Token used to Communicate with Jira|
|KMS.JIRA.Domain|User Token used to Communicate with JIra|


You can generate a Quick Base token from within your profile.