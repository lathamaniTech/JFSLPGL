CREATE TABLE IF NOT EXISTS MASTER_APP_DATA(
appid INTEGER PRIMARY KEY AUTOINCREMENT,
appDate DATE
);

CREATE TABLE IF NOT EXISTS AUDIT_LOG(
auditid INTEGER PRIMARY KEY AUTOINCREMENT,
deviceID TEXT,
username TEXT,
Timestamp TEXT,
auditDate DATE DEFAULT CURRENT_DATE,
service TEXT,
action TEXT,
value BLOB
);

CREATE TABLE IF NOT EXISTS LOGIN_DETAILS(
seq_id INTEGER PRIMARY KEY AUTOINCREMENT,
user_name Varchar(50),
password Varchar(50),
orgscode varchar(50),
status Varchar(15),
statusCode Varchar(10),
ro_name Varchar(50),
userID Varchar(50),
userGroups TEXT
);

CREATE TABLE IF NOT EXISTS ORGANISATION_MASTER(
ORG_ID INTEGER PRIMARY KEY AUTOINCREMENT,
OrgID TEXT,
OrgName TEXT,
OrgBranchCode TEXT,
OrgCity TEXT,
OrgState TEXT,
OrgLevel TEXT
);

CREATE TABLE IF NOT EXISTS PRODUCT_MASTER(
PRD_ID INTEGER PRIMARY KEY AUTOINCREMENT,
prdCode TEXT,
prdSchemeCode TEXT,
prdDesc TEXT,
prdamtFromRange TEXT,
prdamtToRange TEXT,
prdMainCat TEXT,
prdNature TEXT,
prdTenorFrom TEXT,
prdTenorTo TEXT,
prdLoanType TEXT,
prdTenorType TEXT,
prdBussRule TEXT,
prdCoappFlag TEXT,
prdGuaFlag TEXT,
prdMoratoriumMax TEXT,
prdAgeFrom TEXT,
prdAgeTo TEXT,
prdSubCat TEXT,
prdSchemeId TEXT,
prdEntityDocCount TEXT,
prdAppDocCount TEXT,
prdGuaDocCount TEXT,
prdCoappDocCount TEXT,
prdCibilScore TEXT,
prdBranchList TEXT
);

CREATE TABLE IF NOT EXISTS PROOF_TYPE_MASTER(
prooftypeid INTEGER PRIMARY KEY AUTOINCREMENT,
CustomerType TEXT,
ProofId TEXT,
ProofMandatory TEXT,
ProofName TEXT
);

CREATE TABLE IF NOT EXISTS PREMISES_MASTER(
preid INTEGER PRIMARY KEY AUTOINCREMENT,
officeId TEXT,
officeName TEXT
);

CREATE TABLE IF NOT EXISTS EMPLOYEEMENT_MASTER(
empid INTEGER PRIMARY KEY AUTOINCREMENT,
EmpstatusId TEXT,
EmpstatusName TEXT
);

CREATE TABLE IF NOT EXISTS OWNERSHIP_MASTER(
ownid INTEGER PRIMARY KEY AUTOINCREMENT,
OwnerName TEXT,
OwnerValue TEXT
);

CREATE TABLE IF NOT EXISTS RELATIONSHIP_MASTER(
rellaid INTEGER PRIMARY KEY AUTOINCREMENT,
Name TEXT,
Value TEXT
);

CREATE TABLE IF NOT EXISTS MORTGAGE_MASTER(
morid INTEGER PRIMARY KEY AUTOINCREMENT,
TMName TEXT,
TMValue TEXT
);

CREATE TABLE IF NOT EXISTS PROPERTY_MASTER(
propid INTEGER PRIMARY KEY AUTOINCREMENT,
TPName TEXT,
TPValue TEXT
);

CREATE TABLE IF NOT EXISTS BANK_MASTER(
bankid INTEGER PRIMARY KEY AUTOINCREMENT,
bankDetailId TEXT,
bankDetailName TEXT
);

CREATE TABLE IF NOT EXISTS AGENT_MASTER(
ageId INTEGER PRIMARY KEY AUTOINCREMENT,
AgentBranch TEXT,
AgentID TEXT,
AgentName TEXT
);

CREATE TABLE IF NOT EXISTS INSTALLMENT_MASTER(
INS_ID INTEGER PRIMARY KEY AUTOINCREMENT,
Value TEXT,
Name TEXT
);

CREATE TABLE IF NOT EXISTS REPAYMENT_MASTER(
PAY_ID INTEGER PRIMARY KEY AUTOINCREMENT,
Value TEXT,
Name TEXT
);

CREATE TABLE IF NOT EXISTS DOCUMENT_TYPE_MASTER(
DOC_ID INTEGER PRIMARY KEY AUTOINCREMENT,
DocRowID TEXT,
DocPrdCode TEXT,
DocDesc TEXT,
DocType TEXT,
DocID TEXT,
EntityDocFlag TEXT
);

CREATE TABLE IF NOT EXISTS MASTER_UPDATE_VERSION(
versionid INTEGER PRIMARY KEY AUTOINCREMENT,
version TEXT
);

CREATE TABLE IF NOT EXISTS EXISTING_CUSTOMER_DATA (
excusdata INTEGER PRIMARY KEY AUTOINCREMENT,
AppId TEXT,
AppFirstName TEXT,
AppLastName TEXT,
Mobile TEXT,
PanNum TEXT,
OldAppId TEXT,
Urnno TEXT,
LeadId TEXT,
ErrorMsg TEXT,
ErrorCode TEXT,
UrnStatus TEXT,
Aadhar TEXT,
VoterId TEXT,
RationCard TEXT,
Passport TEXT,
DrivingLic TEXT,
Others TEXT,
EnrollStatus TEXT,
IdProof TEXT,
IdProofValue TEXT,
IdProofExp TEXT,
Salutation TEXT,
FatherName TEXT,
MaritalStatus TEXT,
FatherOrSpouse TEXT,
Gndr TEXT,
pre_Area TEXT,
pre_Village TEXT,
pre_City TEXT,
pre_State TEXT,
pre_pincode TEXT,
per_Doorno TEXT,
per_StreetName TEXT,
per_Area TEXT,
per_Village TEXT,
per_City TEXT,
per_State TEXT,
per_pincode TEXT,
per_landmark TEXT,
Education TEXT,
RedFlag TEXT,
aadharCardAvailability TEXT,
aadharCardNumber TEXT,
contactType TEXT,
contactURN TEXT,
CustomerID TEXT,
CustomerType TEXT,
customerURN TEXT,
pre_District TEXT,
Dnum TEXT,
DOB TEXT,
Email TEXT,
EnrollmentStatus TEXT,
errorStackTrace TEXT,
errorType TEXT,
FHLastName TEXT,
FHName TEXT,
MothersMaidedName TEXT,
Name TEXT,
EKycStatus TEXT,
Per_Cross TEXT,
primaryIdentityProof TEXT,
Per_type TEXT,
Per_val TEXT,
resultCode TEXT,
secondaryIdentityProofValue TEXT,
secondaryIDExpiry TEXT,
SIdType TEXT,
SidVal TEXT,
Sname TEXT,
JanaReferenceID TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_ENTITY_DETAILS(
entId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
enterName TEXT,
constitution TEXT,
cin TEXT,
regNo TEXT,
gst TEXT,
doi TEXT,
busiVintage TEXT,
ownership TEXT,
industry TEXT,
enterprise TEXT,
profPic TEXT,
applicantUniqueId TEXT,
eapplType TEXT,
custType TEXT,
leadStatus TEXT,
entiProfPic TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_APP_DETAILS(
id INTEGER PRIMARY KEY AUTOINCREMENT,
createdDate TEXT,
deviceId TEXT,
createdUser TEXT,
appUniqueId TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_BASIC_DETAILS(
refId TEXT,
id INTEGER PRIMARY KEY AUTOINCREMENT,
userType TEXT,
productType TEXT,
prdSche TEXT,
janaLoan TEXT,
loanAmount TEXT,
loanAmountFrom TEXT,
loanAmountTo TEXT,
tenure TEXT,
interest TEXT,
intRate TEXT,
purpose TEXT,
installment TEXT,
refinance TEXT,
vehicleType TEXT,
electricVehicle TEXT,
margin TEXT,
processingFee TEXT,
segmentType TEXT,
stampDuty TEXT,
nachCharges TEXT,
pddCharges TEXT, 
otherCharges TEXT,
borHealthIns TEXT,
coBorHealthIns TEXT,
insPremium TEXT,
preEmi TEXT,
advanceEmi TEXT,
gstonPf TEXT,
gstonSdc Text,
gstonNach TEXT,
gstonPddCharges TEXT,
gstonOtherCharges TEXT,
emi TEXT,
emiMode TEXT,
downpayment TEXT,
totalDownPay TEXT,
dbAmount TEXT,
dealerName TEXT,
dealerCode TEXT,
holiday TEXT,
repayMode TEXT,
pmay TEXT,
advavceInst TEXT,
guaFlag TEXT,
profPic TEXT,
lmsLeadId TEXT,
janaRefId TEXT,
vaultStatus TEXT,
assetAge TEXT,
totalloanAmount TEXT,
dbDate TEXT,
preEmiDB TEXT,
insLPI TEXT,
signPic TEXT
);

CREATE TABLE IF NOT EXISTS SUBMIT_STATUS(
statId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
cibilCheckStat TEXT,
submitStat TEXT,
applicationNumber TEXT,
applicationStatus TEXT,
eapplType TEXT,
cibilColor TEXT,
cibilScore TEXT,
himarkCheckStat TEXT DEFAULT 0,
himarkMemberID TEXT,
himarkScore TEXT,
himarkstatusCode TEXT,
himarkstatusDescription TEXT,
SfosLeadId TEXT,
LpLeadId TEXT,
LpUrn TEXT,
LpCustid TEXT,
vehicleSub TEXT DEFAULT 0,
CASA TEXT DEFAULT 0,
NACH TEXT DEFAULT 0,
creditCheck TEXT DEFAULT 0,
autoApproval TEXT DEFAULT 0,
postSanction TEXT DEFAULT 0,
workFlowStatus TEXT DEFAULT 'Y',
creditEligibility TEXT,
fromGroupInbox TEXT DEFAULT 'N',
fieldInvestigation TEXT DEFAULT 'N',
underFI TEXT DEFAULT 'N',
underManual TEXT DEFAULT 'N',
postSancModified TEXT DEFAULT 'N',
postSancDocUpload TEXT DEFAULT 'N',
pdDocUpload TEXT DEFAULT 'N',
disbursementCheck TEXT DEFAULT 'N',
sanctionedAmt TEXT,
emi TEXT,
eligibleAmt TEXT,
enablePDDDoc TEXT DEFAULT 'N',
nachDoc TEXT DEFAULT 'N',
manualApprovalSucess TEXT DEFAULT 'N',
createdUser TEXT,
docUploadStatus TEXT DEFAULT 'N',
docResubmit TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_PROOF_PROMOTER_DETAILS(
pproofId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
promoIDType TEXT,
promoDoc TEXT,
promoIDRef TEXT,
promoexpiry TEXT,
proofName TEXT,
vaultStatus TEXT,
created_date datetime default current_date
);

CREATE TABLE IF NOT EXISTS ORIG_PERSONAL_DETAILS(
perId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
URNnumber TEXT,
customerType TEXT,
genTitle TEXT,
firstname TEXT,
middlename TEXT,
lastname TEXT,
fathername TEXT,
mothername TEXT,
dob TEXT,
marital TEXT,
spouseName TEXT,
gender TEXT,
mobNum TEXT,
altMobNum TEXT,
panAvailable TEXT,
panNum TEXT,
form60 TEXT,
employment TEXT,
employerName TEXT,
employeeId TEXT,
designation TEXT,
joinDate TEXT,
lmName TEXT,
lmEmail TEXT,
experience TEXT,
monthSalary TEXT,
bussName TEXT,
actDetail TEXT,
monthIncome TEXT,
vinOfServ TEXT,
caste TEXT,
religion TEXT,
languages TEXT,
resciStatus TEXT,
education TEXT,
email TEXT,
profPic TEXT,
userType TEXT,
coAppGuaId TEXT,
applType TEXT,
promocustType TEXT,
leadStatus TEXT,
coAppFlag TEXT,
disableFirstName TEXT DEFAULT 'N',
disableLastName TEXT DEFAULT 'N',
disableFatherName TEXT DEFAULT 'N',
dobDisable TEXT DEFAULT 'N',
disableGender TEXT DEFAULT 'N',
isNameAsPerEkyc TEXT DEFAULT 'N',
nameAsPerEkyc TEXT,
annualIncome TEXT,
dobAadhar TEXT,
dobDocument TEXT,
ShowAadharDob TEXT DEFAULT 'N',
disablePan TEXT,
panName TEXT,
panValidation TEXT DEFAULT 'N',
nameValidation TEXT,
DOBValidation TEXT,
seedingStatus TEXT,
upiNo TEXT,
nameupi TEXT,
vap TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_SOURCING_DETAILS(
refId TEXT,
id TEXT,
sourceid INTEGER PRIMARY KEY AUTOINCREMENT,
userType TEXT,
janaEmployee TEXT,
applicType TEXT,
busiDesc TEXT,
sourChannel TEXT,
leadId TEXT,
typeCase TEXT,
balTrans TEXT,
branchName TEXT,
branchState TEXT,
loginBranch TEXT,
applDate TEXT,
roName TEXT,
roCode TEXT,
sourIdName TEXT,
sourIdName1 TEXT
);

CREATE TABLE IF NOT EXISTS LMS_DATA(
lmsid INTEGER PRIMARY KEY AUTOINCREMENT,
promoter_fname TEXT,
promoter_mname TEXT,
promoter_lname TEXT,
customer_type TEXT,
branch_code TEXT,
name_of_enterprise TEXT,
type_of_industry TEXT,
annual_turnover TEXT,
Loan_amount TEXT,
Loan_purpose TEXT,
mobile_number TEXT,
landline TEXT,
email TEXT,
Offering_Category TEXT,
offering_name TEXT,
offering_variant TEXT,
Other_Offering_Interested TEXT,
Campaign_Code TEXT,
lead_source TEXT,
Lead_status TEXT,
Lead_substatus TEXT,
priority TEXT,
Remarks TEXT,
Door_No TEXT,
Street_Name TEXT,
Cross TEXT,
Area TEXT,
Land_Mark TEXT,
Pincode TEXT,
Country TEXT,
State TEXT,
City TEXT,
Preferred_Store_Front TEXT,
current_emp_id TEXT,
created_date TEXT,
modified_date TEXT,
created_by TEXT,
reference_id TEXT,
Preferred_Meeting_datetime TEXT,
scheme_code TEXT,
Lead_id TEXT,
passed_lead TEXT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS RESUBMIT_LOGIN_DETAILS(
re_seq_id INTEGER PRIMARY KEY AUTOINCREMENT,
re_user_name Varchar(50),
re_password Varchar(50),
re_orgscode varchar(50),
re_submitdata Varchar(1000),
re_status Varchar(15),
re_statusCode Varchar(10)
);

CREATE TABLE IF NOT EXISTS ORIG_PROMOTER_PROOF_IMGS(
proofImgId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
pproofId TEXT,
imgpath TEXT
);

CREATE TABLE IF NOT EXISTS IMD_DETAILS(
imdId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
userType TEXT,
imdPayType TEXT,
imdInstrument TEXT,
imdACName TEXT,
imdACNumber TEXT,
imdAmount TEXT,
imdBName TEXT,
imdDate TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_IMD_IMGS(
chequId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
imdId TEXT,
imgpath TEXT
);

CREATE TABLE IF NOT EXISTS CASA_DETAILS(
casaId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
usertype TEXT,
janaAcc TEXT,
nomAvail TEXT,
guaAvail TEXT,
nomList TEXT,
editedInPS TEXT DEFAULT 'N',
editCasaSaved TEXT DEFAULT '0',
casaStage TEXT DEFAULT '0'
);

CREATE TABLE IF NOT EXISTS NOMINEE_DETAILS(
nomId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
usertype TEXT,
leadId TEXT,
nomTitle TEXT,
nominame TEXT,
nomdob TEXT,
nomiage TEXT,
nomrelation TEXT,
nomi_address1 TEXT,
nomi_address2 TEXT,
nomi_address3 TEXT,
nomicities TEXT,
nomistates TEXT,
nomipincode TEXT,
nomicountries TEXT,
nomiCNum TEXT,
guaTitle TEXT,
guaname TEXT,
guarelation TEXT,
guaCNum TEXT,
gua_address1 TEXT,
gua_address2 TEXT,
guacities TEXT,
guastates TEXT,
guapincode TEXT,
guacountries TEXT
);

CREATE TABLE IF NOT EXISTS SERVICE_DETAILS(
serId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
userType TEXT,
acType TEXT,
modeofoper TEXT,
operaInst TEXT,
authSign TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_SIGN_IMGS(
signId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
serId TEXT,
imgpath TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_ANNEXURE_IMGS(
annexId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
serId TEXT,
imgpath TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_ADDITIONAL_DETAILS(
adtlId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
ownType TEXT,
owner TEXT,
owner1 TEXT,
address1 TEXT,
address2 TEXT,
states TEXT,
cities TEXT,
district TEXT,
pincode TEXT,
country TEXT,
landmark TEXT,
property TEXT
);

CREATE TABLE IF NOT EXISTS COMMON_MASTER_DATA(
MAS_ID INTEGER PRIMARY KEY AUTOINCREMENT,
CODE TEXT,
NAME TEXT,
TYPE TEXT
);

CREATE TABLE IF NOT EXISTS INTEREST_RATE_MASTER_DATA(
INT_ID INTEGER PRIMARY KEY AUTOINCREMENT,
prdCode TEXT,
AmtFromRange TEXT,
AmtToRange TEXT,
Mclr TEXT,
SeqNO TEXT,
IntType TEXT
);

CREATE TABLE IF NOT EXISTS STATE_CITY_MASTER(
SC_ID INTEGER PRIMARY KEY AUTOINCREMENT,
stateCode TEXT,
stateName TEXT,
cityCode TEXT,
cityName TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_PRESENT_ADDRESS_DETAILS(
PRESID INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
userType TEXT,
permSameCheck TEXT,
pres_plots TEXT,
pres_locality TEXT,
pres_line3 TEXT,
pres_states TEXT,
pres_cities TEXT,
pres_district TEXT,
pres_pincode TEXT,
pres_countries TEXT,
pres_landmark TEXT,
pres_resType Text,
pres_yrsCurCity TEXT,
pres_presmAdrsKYC TEXT,
pres_manualEntry TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_PERMANENT_ADDRESS_DETAILS(
PERMID INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
userType TEXT,
appSameCheck TEXT,
perm_permAdrsKYC TEXT,
perm_manualEntry TEXT,
perm_plots TEXT,
perm_locality TEXT,
perm_line3 TEXT,
perm_states TEXT,
perm_cities TEXT,
perm_district TEXT,
perm_pincode TEXT,
perm_countries TEXT,
perm_landmark TEXT,
resType TEXT,
perm_yrsCurCity TEXT
);

CREATE TABLE IF NOT EXISTS ORIG_BUSINESS_ADDRESS_DETAILS(
BUSID INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
userType TEXT,
permSameCheck TEXT,
busi_AdrsKYC TEXT,
busi_manualEntry TEXT,
busi_plots TEXT,
busi_locality TEXT,
busi_line3 TEXT,
busi_states TEXT,
busi_cities TEXT,
busi_district TEXT,
busi_pincode TEXT,
busi_countries TEXT,
busi_landmark TEXT,
busi_yrsCurCity TEXT,
busi_type TEXT
);

CREATE TABLE IF NOT EXISTS SOURCING_ID_MASTER(
SMID INTEGER PRIMARY KEY AUTOINCREMENT,
userId TEXT,
userName TEXT,
userType TEXT,
orgId TEXT
);

CREATE TABLE IF NOT EXISTS PROOF_DETAILS(
AADHID INTEGER PRIMARY KEY AUTOINCREMENT,
leadId TEXT,
janaId TEXT,
idType TEXT,
idNumber TEXT
);

CREATE TABLE IF NOT EXISTS NACH_DETAILS(
nachId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
userType TEXT,
nachImdSame TEXT,
nachBName TEXT,
nachBranName TEXT,
nachACNumber TEXT,
nachIFSC TEXT,
nachAcType TEXT,
nachACName TEXT
);

CREATE TABLE IF NOT EXISTS NACH_IMGS(
nachImgId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
nachId TEXT,
imgpath TEXT
);

CREATE TABLE IF NOT EXISTS NACH_STATEMENT_IMGS(
nachStateId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
nachId TEXT,
imgpath TEXT
);

CREATE TABLE IF NOT EXISTS KARZA_DATA(
KAR_ID INTEGER PRIMARY KEY AUTOINCREMENT,
leadId TEXT,
name TEXT,
fathername TEXT,
dob TEXT,
idNumber TEXT,
address1 TEXT,
address2 TEXT,
state TEXT,
pincode TEXT,
adrsType TEXT,
gender TEXT,
idType TEXT,
idExpiry TEXT,
karzaCheck TEXT DEFAULT 'N'
);

CREATE TABLE IF NOT EXISTS ENTITY_KARZA_DATA(
KAR_ent_ID INTEGER PRIMARY KEY AUTOINCREMENT,
leadId TEXT,
entityName TEXT,
entityId TEXT,
proName TEXT,
idType TEXT,
gst TEXT,
cin TEXT,
tan TEXT,
pan TEXT,
proEmail TEXT,
proPin TEXT,
contact TEXT
);

CREATE TABLE IF NOT EXISTS DEALER_MASTER(
dealerMasterId INTEGER PRIMARY KEY AUTOINCREMENT,
city TEXT,
state TEXT,
rowid TEXT,
district TEXT,
branchCode TEXT,
dealerCode TEXT,
dealerName TEXT,
dealerEmpID TEXT,
dealerEntity TEXT,
dealerPan TEXT,
dealerGstin TEXT,
dealerType TEXT,
crop TEXT,
dealerCurAcc TEXT,
dealerNumber TEXT,
dealerIfsc TEXT,
dealerBankName TEXT,
dealerBranch TEXT,
payout TEXT,
payoutRecent TEXT,
rlspActive TEXT,
rlspTradeLimit TEXT,
rlspAccNumber TEXT,
status TEXT,
segment TEXT,
intrating TEXT,
contactNumber1 TEXT,
contactNumber2 TEXT,
contactNumber3 TEXT,
emailId1 TEXT,
emailId2 TEXT,
emailId3 TEXT,
commContactNumber1 TEXT,
commContactNumber2 TEXT,
commEmailId1 TEXT,
commEmailId2 TEXT,
address TEXT,
orgScode TEXT
);

CREATE TABLE IF NOT EXISTS VEHICLE_DETAILS(
vehicleId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
brandName TEXT,
model TEXT,
cc TEXT,
onroadPrice TEXT,
downpayment TEXT,
dealerType TEXT,
dealerIFSCcode TEXT,
dealerBank TEXT,
dealerBranch TEXT,
dealerAddress TEXT,
insPolicyNo TEXT,
insCompany TEXT,
insDate TEXT,
insExpDate TEXT,
insValue TEXT,
scheme TEXT,
promoCode TEXT,
rcNo TEXT,
engineNo TEXT,
chassisNo TEXT,
yearOfMan TEXT,
kmDriven TEXT,
vehicleAge TEXT,
dealerName TEXT,
dealerCode TEXT,
nomName TEXT,
nomRel TEXT,
nomDOB TEXT,
nomGender TEXT,
variant TEXT,
dealerCurAcc TEXT DEFAULT 'N',
registrationDate TEXT,
dealerQuotation TEXT,
obv TEXT,
assetPrice TEXT,
insuranceCover TEXT,
hypothecation TEXT,
noofOwner TEXT,
assetAge TEXT DEFAULT 'N',
vehicleCatogery TEXT,
nameAsPerRC TEXT,
apiFlag TEXT,
lsoFlag TEXT DEFAULT 'N'
);

CREATE TABLE IF NOT EXISTS EKYC_RESPONSE(
janarefid INTEGER PRIMARY KEY AUTOINCREMENT,
leadId TEXT,
janaid TEXT,
Ekycaddress TEXT,
EkycPersonal TEXT,
aespFlag TEXT
);

CREATE TABLE IF NOT EXISTS VEHICLESCORECARDMASTER(
scoreId INTEGER PRIMARY KEY AUTOINCREMENT,
questionId TEXT,
question TEXT,
questionHeader TEXT
);

CREATE TABLE IF NOT EXISTS POSIDEXCHECK(
posId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
userType TEXT,
verified TEXT DEFAULT 'N',
matchedCustomerDetails TEXT,
newCustomerRemarks TEXT,
existCust TEXT,
urnNo TEXT,
amlCheck TEXT DEFAULT 'N', 
cbsCheck TEXT DEFAULT 'N',
propNo TEXT,
custId TEXT,
amlStatus TEXT,
cbsStatus TEXT
);

CREATE TABLE IF NOT EXISTS VEHICLEBRAND(
brandId INTEGER PRIMARY KEY AUTOINCREMENT,
optionDesc TEXT,
optionValue TEXT
);

CREATE TABLE IF NOT EXISTS VEHICLEMODEL(
velModId INTEGER PRIMARY KEY AUTOINCREMENT,
makeId TEXT,
modelId TEXT,
modelName TEXT,
displayName TEXT,
section TEXT
);

CREATE TABLE IF NOT EXISTS VEHICLEVARIANT(
velVarId INTEGER PRIMARY KEY AUTOINCREMENT,
modelId TEXT,
variantId TEXT,
variantName TEXT,
variantDisplayName TEXT,
fuelType TEXT,
transType TEXT
);
CREATE TABLE IF NOT EXISTS VEHICLEPRICES(
priceId INTEGER PRIMARY KEY AUTOINCREMENT,
variantId TEXT,
variantDisplayName TEXT,
cityId TEXT,
price TEXT,
rto TEXT,
insurance TEXT,
onRoadPrice TEXT
);

CREATE TABLE IF NOT EXISTS SCORECARD(
scoreId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
checked TEXT,
lookalikeScore TEXT,
ltvScore TEXT,
answers TEXT,
AutoApprovalFlag TEXT,
FIFlag TEXT,
FIENTRY TEXT,
SRFLAG TEXT,
STPFLAG TEXT,
NTCFLAG TEXT,
manualApp TEXT
);

CREATE TABLE IF NOT EXISTS VEHICLEWORKFLOW(
workFlowId INTEGER PRIMARY KEY AUTOINCREMENT,
flowPoint TEXT,
flowLevel TEXT,
flowDesc TEXT,
UserGroup TEXT,
UserGroupName TEXT
);

CREATE TABLE IF NOT EXISTS PDD_DOCUMENT_DETAILS(
pddDocId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
docType TEXT,
docDescription TEXT,
remarks TEXT,
uploadFlag TEXT
);

CREATE TABLE IF NOT EXISTS PDD_DOCUMENT_IMAGES(
PddImgId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
docType TEXT,
pddDocImgs TEXT,
pddId TEXT
);

CREATE TABLE IF NOT EXISTS Documents_Vehicle(
DocVehicleId INTEGER PRIMARY KEY AUTOINCREMENT,
docDescription TEXT,
docType TEXT,
docId TEXT,
TYPES TEXT
);

CREATE TABLE IF NOT EXISTS FIELDINSPECTION(
fieldId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
fieldLocation TEXT,
inspectedDate TEXT,
appNo TEXT,
personMet TEXT,
customerRelationship TEXT,
customerName TEXT,
customerMobileNum TEXT,
customerAddress TEXT,
neighbour1Check TEXT,
neighbour2Check TEXT,
residenceStabilityCheck TEXT,
houseOwnerShip TEXT,
agencyFeedback TEXT,
additionalRemarks TEXT,
latitude TEXT,
longitude TEXT,
neighbourName1 TEXT,
neighbourName2 TEXT,
backgroundImg TEXT,
fieldInsFlag TEXT,
manualStatus TEXT DEFAULT 'N'  
);

CREATE TABLE IF NOT EXISTS ORIG_POST_SANCTION_IMGS(
postSanImgId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
pproofId TEXT,
imgpath TEXT,
uploaded TEXT DEFAULT 'N'  
);

CREATE TABLE IF NOT EXISTS ORIG_POST_SANCTION(
postSanId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
modified TEXT,
segmentFlag TEXT,
loanAmount TEXT,
tenure TEXT,
brandName TEXT,
model TEXT,
variant TEXT,
downpayment TEXT,
marginCost TEXT,
segment TEXT,
applicationNumber TEXT,
valuesModified TEXT DEFAULT 'N',
undoProposal TEXT DEFAULT 'N',
scoreCardRerun TEXT DEFAULT 'N',
autoApprovalFlag TEXT DEFAULT 'N',
FieldInvFlag TEXT DEFAULT 'N',
ManualApprovalFlag TEXT DEFAULT 'N',
psmFlowState TEXT,
flowStatus TEXT,
autoApprovalStatus TEXT DEFAULT 'N',
FieldInvStatus TEXT DEFAULT 'N',
ManualApprovalStatus TEXT DEFAULT 'N',
psmSubmitted TEXT DEFAULT 'N',
groupInboxFlag TEXT DEFAULT 'N',
totalloanAmount TEXT,
dbDate TEXT,
preEmiDB TEXT,
STPFLAG TEXT,
SRFLAG TEXT,
FIENTRY TEXT,
NTCFLAG TEXT,
FIFLAG TEXT,
dealerName TEXT,
cc TEXT,
rcNo TEXT,
engineNo TEXT,
chassisNo TEXT,
yearOfMan TEXT,
registrationDate TEXT,
vehicleAge TEXT,
hypothecation TEXT,
noofOwner TEXT,
kmDriven TEXT,
dealerQuotation TEXT,
obv TEXT,
assetPrice TEXT,
assetAge TEXT,
vehicleCatogery TEXT,
nameAsPerRC TEXT,
apiFlag TEXT,
lsoFlag TEXT DEFAULT 'N'
);

CREATE TABLE IF NOT EXISTS PROCESSING_FEES(
ProceesFeesId INTEGER PRIMARY KEY AUTOINCREMENT,
amtFrom TEXT,
amtTo TEXT,
minProcessingFee TEXT,
maxProcessingFee TEXT,
prodId TEXT,
proPercentage TEXT
);

CREATE TABLE IF NOT EXISTS CBS_CREATION(
cbsId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
customerId TEXT,
instaKitNumber TEXT,
accountNo TEXT,
cbsButtonEnable TEXT DEFAULT 'N',
cbsCustomerEnable TEXT DEFAULT 'N',
cbsAccountEnable TEXT DEFAULT 'N',
cbsInstakitEnable TEXT DEFAULT 'N',
instakitStatus TEXT DEFAULT 'N',
applicationNumber TEXT
);

CREATE TABLE IF NOT EXISTS REFERENCE_DETAILS(
detailId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
refName TEXT,
mobileNo TEXT,
refAddress TEXT,
relationship TEXT,
userType TEXT
);

CREATE TABLE IF NOT EXISTS PDD_DATA_DETAILS(
pddDataId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
rcNo TEXT,
engineNo TEXT,
chassisno TEXT,
finalInvoice TEXT
);

CREATE TABLE IF NOT EXISTS LPI_INSURANCE(
lpiId INTEGER PRIMARY KEY AUTOINCREMENT,
lpifromage TEXT,
lpifromtenure TEXT,
lpimultiplier TEXT,
lpitoage TEXT,
lpitotenure TEXT
);

CREATE TABLE IF NOT EXISTS PDD_CHARGES(
pddId INTEGER PRIMARY KEY AUTOINCREMENT,
AmtFromRange TEXT,
AmtToRange TEXT,
PddCharges TEXT,
prdCode TEXT
);

CREATE TABLE IF NOT EXISTS PSL_BUSINESS(
pslId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
psl TEXT,
loanPurpose TEXT,
agriProofType TEXT,
landHolding TEXT,
farmerType TEXT,
actType TEXT,
agriPurpose TEXT,
udyamCNo TEXT,
udyamRegNo TEXT,
udyamClass TEXT,
majorAct TEXT,
udyamInvest TEXT,
udyamTurnOver TEXT,
servUnit TEXT
);

CREATE TABLE IF NOT EXISTS PSL_BUSINESS_IMG(
pslImgId INTEGER PRIMARY KEY AUTOINCREMENT,
refId TEXT,
id TEXT,
pslTableId TEXT,
imgPath TEXT,
uploaded TEXT DEFAULT 'N'
);

CREATE TABLE IF NOT EXISTS DOCUMENT_UPLOAD(
docuploadId INTEGER PRIMARY KEY AUTOINCREMENT,
DocId TEXT,
Document TEXT,
leadID TEXT,
DocName TEXT,
applicationNumber TEXT,
docuploadstatus TEXT DEFAULT 'N'
);

CREATE TABLE IF NOT EXISTS APPLICATION_VERSION_CHECK(
ver_ID INTEGER PRIMARY KEY AUTOINCREMENT,
ApplicationVersion TEXT,
LendVersion TEXT,
AppDate TEXT
);

CREATE TABLE IF NOT EXISTS ERROR_LOG(
errorId INTEGER PRIMARY KEY AUTOINCREMENT,
deviceID TEXT,
username TEXT,
Timestamp TEXT,
auditDate DATE DEFAULT CURRENT_DATE,
errorDesc BLOB,
pageName TEXT
);

CREATE TABLE IF NOT EXISTS STAMPDUTY_MASTER(
seqId INTEGER PRIMARY KEY AUTOINCREMENT,
state TEXT, 
applicablestampduty TEXT,
rowid TEXT
);
