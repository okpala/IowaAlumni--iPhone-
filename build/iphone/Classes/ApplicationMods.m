#import "ApplicationMods.h"

@implementation ApplicationMods

+ (NSArray*) compiledMods
{
	NSMutableArray *modules = [NSMutableArray array];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"google-analytics",@"name",@"analytics.google",@"moduleid",@"1.0",@"version",@"2dce4125-1f59-40f1-aeb9-3ed250b36dd9",@"guid",@"",@"licensekey",nil]];
	return modules;
}

@end